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
      core.debug(
        `fetched current checks for ${owner}/${repo}/${sha} "${checkName}"`
      );
      return checks;
    };

    const updateCheck = async (id, { status, conclusion }) => {
      const summary =
        conclusion === 'failure'
          ? `Missing labels for Pull Request. Valid labels are ${validLabels.toString()}. (${checkUrl})`
          : `All good. (${checkUrl})`;
      const response = await octokit.checks.update({
        owner,
        repo,
        check_run_id: id,
        name: checkName,
        status,
        conclusion,
        output: {
          title: conclusion,
          summary,
        },
      });
      core.debug('updated current check ' + id);
      return response;
    };

    const createCheck = async ({ status, conclusion }) => {
      const summary =
        conclusion === 'failure'
          ? `Missing labels for Pull Request. Valid labels are ${validLabels.toString()}.`
          : 'All good.';
      core.debug('creating a new check');
      const response = await octokit.checks.create({
        owner,
        repo,
        head_sha: sha,
        name: checkName,
        status,
        conclusion,
        output: {
          title: conclusion,
          summary,
        },
      });
      return response;
    };

    const runCheck = async (ok) => {
      const activeChecks = await getChecks();
      if (activeChecks.total_count > 0) {
        await Promise.all(
          activeChecks.check_runs.map((check) =>
            updateCheck(check.id, {
              status: 'completed',
              conclusion: ok ? 'success' : 'failure',
            })
          )
        );
      } else {
        createCheck({
          status: 'completed',
          conclusion: ok ? 'success' : 'failure',
        });
      }
    };

    const prLabels = await getPrLabels();
    if (prLabels.length === 0) {
      await runCheck(false);
    }
    const hasValidLabels = prLabels.some((label) =>
      validLabels.includes(label)
    );
    if (hasValidLabels) {
      await runCheck(true);
    } else {
      await runCheck(false);
    }
  } catch (error) {
    await core.setFailed(error.message);
  }
})();
