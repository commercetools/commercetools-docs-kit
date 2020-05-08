<!-- vale Google.We = NO -->
<!-- vale Google.Will = NO -->
<!-- vale Google.FirstPerson = NO -->

# Contributing

Please _read_ before contributing to commercetools Documentation Kit to get familiar with the guidelines for contributing to the project.

## Core Ideas

At commercetools we want to create documentation websites that are visually and functional consistent. To do so, commercetools provides this set of tools and components that should be used across the different websites, for example a Gatsby documentation theme.

This repository contains all the necessary packages to build a documentation website. Some of them do not need to be used directly but are instead required by other packages. Let's have a deeper look.

## Folder Structure

This repository is managed as a monorepo, meaning it contains multiple (sub)packages located in the [`packages`](./packages) directory.

## Getting started

1. Clone the repository
2. Run `yarn` in the root folder

Once it's done, you can run `yarn start` or `yarn test` (`yarn test:watch`) to develop the packages.

## Developing locally

To develop locally, you can use the `websites/docs-smoke-test` application to test the changes in some of the packages.

## Rebasing and merging Pull Requests

We only allow the **Squash and merge** mode when merging a Pull Request so that:

- we have a cleaner commit history on `master` branch
- we can have automatic releases, like `canary`, that will publish a new version on each new commit in `master`

Furthermore, we also prefer to use `rebase` when keeping branches up-to-date. This is again to have a cleaner history.

## Development tools

We use a bunch of tools to help the development process and to ease maintenance.

### Linters

We use `eslint` and `stylelint` to check both the JS code and the CSS-in-JS. Linters run as a `jest-runner`, which provides a nice developer experience like jest watch mode.

To run them, execute `yarn lint`. You can also run individual linters (check the available `scripts` in the `package.json`).

### Prettier

To ensure a consistent code formatting, we use `prettier` for all different types of supported file extensions. The formatting is also checked by the ESlint plugin for prettier.

### Git hooks

We use some git hooks to enforce some conventions, powered by the `husky` package:

- `commit-msg`: it checks that the commit message adheres to the [conventional commit](https://conventionalcommits.org/)
- `pre-commit`: we use this to run `lint-staged`, which runs linters and prettier on the staged files

### GitHub labels

To help maintaining GitHub labels, we use the `@commercetools/github-labels` package that allows to manage the labels using a config file. See the package for more information about its usage.

## Dependencies

We use `yarn` to manage the dependencies in the monorepo, using the `workspace` feature of `yarn`. Furthermore, to ensure that every contributor uses the same version of `yarn`, we include the `yarn` binary in the repository and point `yarn-path` to it (see `.yarnrc`). This helps ensuring that things like `yarn.lock` is consistent.

## Dependency updates

We use the `Renovate App` to manage dependency updates. The app/bot will create Pull Requests whenever there are new versions of the dependencies used in the repository. To avoid too many Pull Requests, we have scheduled updates on Mondays only.

## Cutting a Release

By default, all releases go to the `next` distribution channel and should be considered **prereleases**. This gives us a chance to test out a release before marking it **stable** in the `latest` distribution channel.

#### Draft release notes in the Changelog

1. Make sure that each merged PR that should be mentioned in the release changelog is labelled with one of the [labels](https://github.com/commercetools/commercetools-docs-kit/labels) named `Type: ...` to indicate what kind of change it is.
2. Create a changelog entry for the release

- Copy `.env.template` and name it `.env`
- You'll need an [access token for the GitHub API](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). Save it to the environment variable: `GITHUB_AUTH`
- Run `yarn changelog`. The command will find all the labeled pull requests merged since the last release and group them by the label and affected packages, and create a change log entry with all the changes and links to PRs and their authors. Copy and paste it to `CHANGELOG.md`.
- The list of committers does not need to be included.
- Check if some Pull Requests are referenced by different label types and decide if you want to keep only one entry or have it listed multiple times.
- Add a four-space indented paragraph after each non-trivial list item, explaining what changed and why. For each breaking change also write who it affects and instructions for migrating existing code.
- Maybe add some newlines here and there. Preview the result on GitHub to get a feel for it. Changelog generator output is a bit too terse for my taste, so try to make it visually pleasing and well grouped.

3. (_Optional_) Include "_Migrating from .._" instructions for the previous release in case you deem it necessary.
4. Commit the changelog (usually by opening a new Pull Request).

#### Release the packages

1. Make sure the `CHANGELOG.md` has been updated.
2. Check that your npm account has access to the `@commercetools-docs` organization and that you are logged in with the `npm` command-line tool.
3. Run `yarn release`: the packages will be bundled with Rollup first, then Lerna will prompt you to select the version that you would like to release (minor, major, pre-release, etc.).
4. Wait a bit until Lerna bumps the versions, creates a commit and a tag and finally publishes the packages to npm (to the `next` distribution channel).
5. After publishing, create a GitHub Release with the same text as the `CHANGELOG.md` entry. See previous Releases for inspiration.

#### Moving the `latest` dist-tag to a release:

After testing the `next` release on a production project, if the version is **stable** it can be finally moved to the `latest` distribution channel.

```bash
$ yarn release:from-next-to-latest
```

The command will promote the version published on `next` to the `latest` npm dist-tag, for each package.

## Canary releases

On `master` branch, we automatically publish **canary** releases from CI to the `canary` distribution channel, _after_ the build runs successfully.

Canary releases are useful to test early changes that should not be released yet to `next` or `latest`. They are automatically triggered and released after a Pull Request merged into `master`, unless the commit message contains `[skip publish]`.

Note that canary releases **will not create git tags and version bump commits**.
