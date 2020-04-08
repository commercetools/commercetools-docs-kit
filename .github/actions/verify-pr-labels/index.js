const core = require('@actions/core');
const github = require('@actions/github');

const checkName = 'Verify Pull Request Labels';
const getPullRequestNumber = (ref) => {
  core.info(`Parsing ref ${ref}`);
  // This assumes that the ref is in the form of `refs/pull/:prNumber/merge`
  return ref.replace(/refs\/pull\/(\d+)\/merge/, '$1');
};

(async () => {
  try {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const ref = github.context.ref;
    const sha = github.context.sha;
    const checkUrl = `https://github.com/${owner}/${repo}/commit/${sha}/checks`;
    const gitHubToken = core.getInput('github-token', { required: true });
    const validLabels = core
      .getInput('valid-labels', { required: true })
      .split(',')
      .map((label) => label.trim());
    core.info(`Configured labels: ${validLabels.toString()}`);

    const octokit = new github.GitHub(gitHubToken);

    const getPrLabels = async () => {
      const prNumber = getPullRequestNumber(ref);
      const { data } = await octokit.pulls.get({
        pull_number: prNumber,
        owner,
        repo,
      });
      if (data.length === 0) {
        throw new Error(`No Pull Requests found for associated commit ${sha}.`);
      }
      return data.labels.map((label) => label.name);
    };

    const getChecks = async () => {
      const { data: checks } = await octokit.checks.listForRef({
        owner,
        repo,
        ref: sha,
        check_name: checkName,
      });
      core.info(`Found checks: ${JSON.stringify(checks)}`);
      return checks;
    };

    const updateCheck = async (id, { conclusion }) => {
      const summary =
        conclusion === 'failure'
          ? `Missing labels for Pull Request. Valid labels are ${validLabels.toString()}. (${checkUrl})`
          : `All good. (${checkUrl})`;
      const updatedCheck = {
        owner,
        repo,
        check_run_id: id,
        name: checkName,
        status: 'completed',
        conclusion,
        output: {
          title: conclusion,
          summary,
        },
      };
      core.info(`Updating check ${id}: ${JSON.stringify(updatedCheck)}`);
      const response = await octokit.checks.update(updatedCheck);
      return response;
    };

    const createCheck = async ({ conclusion }) => {
      const summary =
        conclusion === 'failure'
          ? `Missing labels for Pull Request. Valid labels are ${validLabels.toString()}.`
          : 'All good.';
      const newCheck = {
        owner,
        repo,
        head_sha: sha,
        name: checkName,
        status: 'completed',
        conclusion,
        output: {
          title: conclusion,
          summary,
        },
      };
      core.info(`Creating a new check ${JSON.stringify(newCheck)}`);
      const response = await octokit.checks.create(newCheck);
      return response;
    };

    const runCheck = async (conclusion) => {
      const activeChecks = await getChecks();
      if (activeChecks.total_count > 0) {
        await Promise.all(
          activeChecks.check_runs.map((check) =>
            updateCheck(check.id, { conclusion })
          )
        );
      } else {
        createCheck({ conclusion });
      }
    };

    const prLabels = await getPrLabels();
    core.info(`Found PR labels ${prLabels}`);
    if (prLabels.length > 0) {
      const hasValidLabels = prLabels.some((label) =>
        validLabels.includes(label)
      );
      core.info(`Valid labels: ${hasValidLabels}`);
      if (hasValidLabels) {
        await runCheck('success');
        return;
      }
    }
    await runCheck('failure');
  } catch (error) {
    await core.setFailed(error.message);
  }
})();
