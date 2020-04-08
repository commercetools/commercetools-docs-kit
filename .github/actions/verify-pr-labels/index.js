const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

const getPullRequestNumber = (ref) => {
  core.debug(`Parsing ref: ${ref}`);
  // This assumes that the ref is in the form of `refs/pull/:prNumber/merge`
  return ref.replace(/refs\/pull\/(\d+)\/merge/, '$1');
};

(async () => {
  try {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const ref = github.context.ref;
    const sha = github.context.sha;
    const prNumber = getPullRequestNumber(ref);
    const checkUrl = `https://github.com/${owner}/${repo}/commit/${sha}/checks`;
    const gitHubToken = core.getInput('github-token', { required: true });
    const useLernaJson = Boolean(core.getInput('use-lerna-json'));

    const parseValidLabels = () => {
      if (useLernaJson) {
        const lernaJson = JSON.parse(
          fs.readFileSync('./lerna.json', { encoding: 'utf8' })
        );
        return Object.keys(lernaJson.changelog.labels);
      }
      return core
        .getInput('valid-labels', { required: true })
        .split(',')
        .map((label) => label.trim());
    };

    const validLabels = parseValidLabels();
    core.info(`Configured labels: ${validLabels.toString()}`);

    const octokit = new github.GitHub(gitHubToken);

    const getPrLabels = async (prNumber) => {
      const { data } = await octokit.pulls.get({
        pull_number: prNumber,
        owner,
        repo,
      });
      if (data.length === 0) {
        throw new Error(`No Pull Requests found for ${prNumber} (${ref}).`);
      }
      return data.labels.map((label) => label.name);
    };

    const prLabels = await getPrLabels(prNumber);
    core.info(`Found PR labels ${prLabels}`);

    if (prLabels.length > 0) {
      const hasValidLabels = prLabels.some((label) =>
        validLabels.includes(label)
      );
      if (hasValidLabels) {
        core.info(`Valid labels have been assigned. All good!`);
        return;
      }
    }
    await core.setFailed(
      `Missing labels for Pull Request ${prNumber}. Valid labels are ${validLabels.toString()}. (${checkUrl})`
    );
  } catch (error) {
    await core.setFailed(error.message);
  }
})();
