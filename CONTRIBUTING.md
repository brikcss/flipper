# Contributing to brikcss

**We love contributors and appreciate all contributions!!!**

We more than welcome all questions, feedback, bug reports, and pull requests. Before submitting any type of request, please closely adhere to our contributing guidelines below. This will help us maintain an efficient level of communication, make the development process smooth and enjoyable, and make `brikcss` amazing!


<!-- MarkdownTOC depth=5 -->

1. [Code of Conduct](#code-of-conduct)
1. [Question or problem? Feature request? Found a bug?](#question-or-problem-feature-request-found-a-bug)
	1. [Submitting an issue](#submitting-an-issue)
1. [Contributing code / pull requests](#contributing-code--pull-requests)
	1. [Release channels](#release-channels)
	1. [Development workflow and requirements](#development-workflow-and-requirements)
		1. [Contributor checklist](#contributor-checklist)
		1. [Maintainer checklist](#maintainer-checklist)
		1. [Automated build and release checklist](#automated-build-and-release-checklist)
	1. [Commit Policy](#commit-policy)
		1. [Make-up of a commit message](#make-up-of-a-commit-message)
		1. [How to write valid commit messages](#how-to-write-valid-commit-messages)
			1. [`npm run commit`](#npm-run-commit)
			1. [Commit linter](#commit-linter)
			1. [Sublime commit snippet](#sublime-commit-snippet)
	1. [Tooling](#tooling)

<!-- /MarkdownTOC -->

<a name="code-of-conduct"></a>
## Code of Conduct

**_Please be respectful and kind. Treat others as you would like to be treated._**

We embrace all questions, feedback, and other contributions. We also embrace difficult conversations when they need to be had. But there are no "dumb" questions or comments and all contributions and contributors -- however big or small -- are welcome and appreciated. We aim to treat all contributors with kindness and respect, and ask all others to do the same.

We love coding and creating cool stuff like `brikcss`. But please remember that in the end, this is just code. _The way we treat others is always more important than code_.

We reserve the right to take any action -- such as removing issues, comments, PRs, or blocking accounts -- whenever this code of conduct is violated.

<a name="question-or-problem-feature-request-found-a-bug"></a>
## Question or problem? Feature request? Found a bug?

We _encourage_ questions, requests, bug reports, feedback, and especially [pull requests](#contributing-code--pull-requests). This helps us develop a better product! Please help us maximize our efforts by doing all you can to avoid reporting duplicate issues. Search for answers or related bugs first. If you can't find answers, please submit an issue.

<a name="submitting-an-issue"></a>
### Submitting an issue

When submitting a GitHub issue, please copy and paste the following template into your request and fill out all fields relevant to your request:

<pre>
**Type of request**: Question or Feature request or Bug or Other request
**Overview**: Explain the details of your request. The more specific you are, the less back and forth required to understand the request.
**Motivation**: Why is this important to you and why should it be important to everybody?
**Browsers and Operating System**: What browser(s) and OS(s) can this be duplicated on?
**Steps to reproduce**: List steps to reproduce any issues.
**Live code example**: A live example of the issue on <a href="https://codepen.io">codepen</a>, <a href="https://jsfiddle.net">jsfiddle</a> (or another code playground) is most helpful. If not possible, an inline code example will do.
**Suggested fixes**: Ideally we prefer you submit a pull request. However, we don't want to waste your time either. So before submitting a PR, please suggest a fix. If you can't fix it, please help to diagnose where the issue might be coming from. The more help you provide, the more quickly we can handle your request.
</pre>

<a name="contributing-code--pull-requests"></a>
## Contributing code / pull requests

**Thank you for contributing!!!** We love you and appreciate all contributions.

We don't want to waste your time (or ours), and we don't want to duplicate any effort. To save time and create a smooth development experience, we have some specific rules for committing and pushing code. This is so:

1. We can automate our NPM and GitHub releases.
2. We can automatically generate our changelogs.
3. We can easily understand the commit history.

**IMPORTANT: Because our release process is automated (and so much determined by the commit log), it is important you understand the details and guidelines in this section, and strictly follow our [commit policy](#commit-policy).**

<a name="release-channels"></a>
### Release channels

To help produce quality code, we maintain the following [release channels](https://github.com/npm/npm/issues/2718):

|  Channel   | git branch | NPM dist-tag |                                         Description                                          |
|------------|------------|--------------|----------------------------------------------------------------------------------------------|
| **Dev**    | `dev`      | `dev`        | Code is always pushed here first, and (perhaps) eventually released to the _stable_ channel. |
| **Stable** | `master`   | `latest`     | Considered most stable. Code is only released here after vetted in the _dev_ channel.        |

_Note: Release channels are simply [NPM dist-tags](https://docs.npmjs.com/cli/dist-tag). To view all dist-tags in NPM:_

```bash
# Outputs tagged version for each release channel / NPM dist-tag.
npm dist-tag ls @brikcss/<package>
```

<a name="development-workflow-and-requirements"></a>
### Development workflow and requirements

Use the following checklists (grouped by role) to know exactly what you need to do to contribute code. The last checklist -- automated build and release checklist -- shows what the happens automagically after code is pushed to any remote branch.

<a name="contributor-checklist"></a>
#### Contributor checklist

- [ ] Read the [guide to contributing code](#contributing-code--pull-requests) before getting started.
- [ ] _Before writing any code_, [create an issue](#submitting-an-issue) to discuss with us any pull request ideas you have. This helps ensure we are on the same page and increases the likelihood we will approve your pull request.
- [ ] Commit your code to a feature/bug branch **which was branched from `master`**.
- [ ] All commit messages strictly adhere to our [commit policy (outlined below)](#commit-policy).
- [ ] When your work is ready, create a pull request to merge to `dev`.
- [ ] Let us know your pull request is ready.

<a name="maintainer-checklist"></a>
#### Maintainer checklist

- [ ] Ensure all commits follow our [commit policy](#commit-policy) so they can be properly recognized by our release process.
- [ ] Review pull requests. Contact contributor if changes are needed.
- [ ] Merge code to `dev` (which is automatically released to the dev channel).
- [ ] QA on the dev channel.
- [ ] Merge code to `master` (which is automatically released to the stable channel).

<a name="automated-build-and-release-checklist"></a>
#### Automated build and release checklist

When code is pushed to _any_ branch, the following is _automatically_ triggered:

- [ ] [Travis CI](https://travis-ci.org/) runs tests and creates a build to make sure they pass in an isolated environment.

When code is pushed to the `dev` or `master` branch, a new release is triggered _for that channel_. This will do the following:

- [ ] Release type (i.e., _major_, _minor_, or _patch_) is determined from the commit history.
- [ ] Version is bumped accordingly.
- [ ] Build is created with new versions.
- [ ] Changelog is automatically generated based on commit history.
- [ ] Release is published to NPM.
- [ ] Release is tagged and pushed to GitHub, with release notes.

<a name="commit-policy"></a>
### Commit Policy

Our commit policy exists primarily to automate our release process and better understand our commit history. We use [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) with some exceptions as outlined in these docs.

<a name="make-up-of-a-commit-message"></a>
#### Make-up of a commit message

The parts that make up a commit message include _type_, _scope_, _subject_, _body_, and _footer_, and looks like this:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

where:

- **type** is required metadata which categorizes the type of commit. See [how to correctly select a commit type](docs/commit-types.md).
- **scope** is required metadata which describes in 1-2 words the place in the code where changes occurred. See [how to correctly choose a commit scope](docs/commit-scopes.md).
- **subject** describes the changes which, along with _type_ and _scope_, is limited to 100 characters.
- **body** provides additional details related to this commit. See [how to write a good commit body](docs/commit-body.md).
- **footer** contains _all_ references to issues and flags whether this commit has any breaking changes. See [how to write the commit footer](docs/commit-footer.md).

See a [good example of a commit message](docs/commit-message-example.md).

<a name="how-to-write-valid-commit-messages"></a>
#### How to write valid commit messages

Tools are provided to make it easy to [write and validate commit messages](#commit-policy).

_Note: When you commit code, [git hooks](#tooling) run and trigger other tasks. This takes time to complete, so do not be alarmed when committing code takes longer than it otherwise would._

<a name="npm-run-commit"></a>
##### `npm run commit`

Running `npm run commit` will prompt you for all information needed to create a proper commit message. It is **strongly** encouraged to use this command instead of `git commit`.

_Note: The `git cz` command is also available if you have [commitizen](https://www.npmjs.com/package/commitizen) installed globally (`npm install -g commitizen`). This command is the same as running `npm run commit`._

<a name="commit-linter"></a>
##### Commit linter

If you choose not to use `npm run commit`, you will run into errors if your commit message does not follow our [commit policy](#commit-policy). This is because [commitlinter](https://www.npmjs.com/package/@commitlint/prompt) lints every commit message.

Never fear. When you create a commit message that does not meet our commit policy, the error message will describe why your commit message was not accepted. Simply update your commit message and all is well!

<a name="sublime-commit-snippet"></a>
##### Sublime commit snippet

If you choose not to use `npm run commit`, and you use Sublime Text, [here is a helpful Sublime snippet](https://gist.github.com/thezimmee/1034b814cef92181c5342ec693bd9a97) which will help you write commit messages that meet our guidelines.

<a name="tooling"></a>
### Tooling

Understanding [how to contribute code](#contributing-code--pull-requests) should be enough to contribute. If you want to take a deeper look "under the hood", here are the main tools we use:

- [`semantic-release`](https://github.com/semantic-release/semantic-release/) is used to manage code releases.
- [`commitlint`](https://www.npmjs.com/package/@commitlint/cli) (which is an abstract of [`commitizen`](https://www.npmjs.com/package/commitizen)) is used to create and [lint/validate commit messages](#commit-linter).
- [`husky`](https://www.npmjs.com/package/husky) is used to create [git hooks]([git hooks](https://git-scm.com/docs/githooks)) that are source controlled. The following git hooks are used:
	- _commitmsg_: All commit messages are validated to ensure they follow our [commit policy](#commit-policy). This is important since our changelogs are automatically generated from commit history. This hook also appends the branch name to your commit message (which is useful to browse the commit history).
	- _prepush_: This hook automatically runs tests and the build. You will not be allowed to push code unless tests and the build pass.
