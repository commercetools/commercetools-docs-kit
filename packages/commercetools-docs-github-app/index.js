/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(
    [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request.labeled',
      'pull_request.unlabeled',
    ],
    requireLiveLabel
  );

  async function requireLiveLabel(context) {
    // grab information
    // https://developer.github.com/v3/pulls/#response-1

    const pr = context.payload.pull_request;
    const { sha } = pr.head;
    const name = 'require_live_label';
    const title = "Blocked until 'Deployed' label set";
    const status = 'completed';
    const OK =
      pr.body.contains('[X] Block PR until deployed') &&
      pr.labels.findIndex(l => l.name === 'LIVE') >= 0;
    const conclusion = OK ? 'success' : 'failure';
    const { owner, repo } = context.repo();
    const summary = `[See Log](https://github.com/${owner}/${repo}/commit/${sha}/checks)`;

    if (pr.draft === false) {
      const { data: checks } = await context.github.checks.listForRef(
        context.repo({
          ref: sha,
          check_name: name,
        })
      );
      if (checks.total_count > 0) {
        return Promise.all(
          checks.check_runs.map(check =>
            context.github.checks.update(
              context.repo({
                check_run_id: check.id,
                name,
                status,
                conclusion,
                output: {
                  title,
                  summary,
                },
              })
            )
          )
        );
      }
      return context.github.checks.create(
        context.repo({
          head_sha: sha,
          name,
          status,
          conclusion,
          output: {
            title,
            summary,
          },
        })
      );
    }
    return null;
  }
};
