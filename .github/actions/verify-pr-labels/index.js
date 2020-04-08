const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

const getPullRequestNumber = (ref) => {
  core.debug(`Parsing ref: ${ref}`);
  // This assumes that the ref is in the form of `refs/pull/:prNumber/merge`
  const prNumber = ref.replace(/refs\/pull\/(\d+)\/merge/, '$1');
  return parseInt(prNumber, 10);
};

(async () => {
  try {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const ref = github.context.ref;
    const prNumber = github.context.issue.number || getPullRequestNumber(ref);
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
    core.debug(`Found PR labels: ${prLabels.toString()}`);

    const reviews = await octokit.pulls.listReviews({
      owner,
      repo,
      pull_number: prNumber,
    });
    const allReviewsFromActionsBot = reviews.data.filter(
      (review) => review.user.login === 'github-actions[bot]'
    );
    core.debug(
      `Reviews from actions bot: ${JSON.stringify(allReviewsFromActionsBot)}`
    );

    if (prLabels.length > 0) {
      const hasValidLabels = prLabels.some((label) =>
        validLabels.includes(label)
      );
      if (hasValidLabels) {
        core.info(`Valid labels have been assigned. All good!`);
        await Promise.all(
          allReviewsFromActionsBot.map((review) =>
            octokit.pulls.dismissReview({
              owner,
              repo,
              pull_number: prNumber,
              review_id: review.id,
              message: 'All good!',
            })
          )
        );
        return;
      }
    }

    const hasActionBotRequestedChanges =
      allReviewsFromActionsBot.filter(
        (review) => review.state === 'REQUEST_CHANGES'
      ).length > 0;
    if (hasActionBotRequestedChanges) {
      core.info(`Skipping REQUEST_CHANGES review`);
      return;
    }

    const labelsAsMdList = validLabels.map((label) => `- ${label}`).join('\n');
    const reviewMessage = `👋 Hi,
this is a reminder message for maintainers to assign a proper label to this Pull Request.
This is important to be able to properly generate a changelog.

Valid labels are:
${labelsAsMdList}

The bot will dismiss the review as soon as a valid label has been assigned to the Pull Request.

Thanks.`;
    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: prNumber,
      body: reviewMessage,
      event: 'REQUEST_CHANGES',
    });
  } catch (error) {
    await core.setFailed(error.stack || error.message);
  }
})();
