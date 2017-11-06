# Contributing to brikcss

**We love contributors and appreciate all contributions!!!**

We more than welcome all questions, feedback, bug reports, and pull requests. Before submitting any type of request, please closely adhere to our contributing guidelines below. This will help us maintain an efficient level of communication, make the development process smooth and enjoyable, and make `brikcss` amazing!


<!-- MarkdownTOC depth=5 -->

1. [Code of Conduct](#code-of-conduct)
1. [Question or problem? Feature request? Found a bug?](#question-or-problem-feature-request-found-a-bug)
	1. [Submitting an issue](#submitting-an-issue)
1. [Submitting Pull Requests](#submitting-pull-requests)
1. [Committing and pushing code](#committing-and-pushing-code)
	1. [Release channels](#release-channels)
	1. [Development requirements](#development-requirements)
	1. [Commit Policy](#commit-policy)
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

We reserve the right to take action -- such as removing issues, comments, PRs, or blocking accounts -- whenever this code of conduct is violated.

<a name="question-or-problem-feature-request-found-a-bug"></a>
## Question or problem? Feature request? Found a bug?

Please help us to maximize our efforts by doing all you can to avoid reporting duplicate issues. Search for answers or related bugs first. If you can't find answers, please submit an issue.

<a name="submitting-an-issue"></a>
### Submitting an issue

Please use the following template when making any request (via github issues) and fill out all fields relevant to your request:

<pre>
**Type of request**: Question or Feature request or Bug or Other request
**Overview**: Explain the details of your request. The more specific you are, the less back and forth required to understand the request.
**Motivation**: Why is this important to you and why should it be important to everybody?
**Browsers and Operating System**: What browser(s) and OS(s) can this be duplicated on?
**Steps to reproduce**: List steps to reproduce any issues.
**Live code example**: A live example of the issue on <a href="https://codepen.io">codepen</a>, <a href="https://jsfiddle.net">jsfiddle</a> (or another code playground) is most helpful. If not possible, an inline code example will do.
**Suggested fixes**: Ideally we prefer you submit a pull request. However, we don't want to waste your time either. So before submitting a PR, please suggest a fix. If you can't fix it, please help to diagnose where the issue might be coming from. The more help you provide, the more quickly we can handle your request.
</pre>

<a name="submitting-pull-requests"></a>
## Submitting Pull Requests

We don't want to waste your time. And we don't want to duplicate any effort. So **before** submitting any pull request, please do the following:

1. [Open an issue](#submitting-an-issue) and discuss the pull request with us.
2. Read this entire [contributing guide](contributing.md).

When creating a pull request, follow these guidelines:

- Make your changes in a new git branch, created from `master`.
	```
	git checkout -b my-branch master
	```
- Create your fix or feature.
- **Important**: Commit your changes by following our [commit policy](#committing-work).
- Push your feature branch to github.
	```
	git push origin my-branch
	```
- Create a pull request.
- We will review it and either merge or discuss with you the next steps.

**Thank you for your contribution!!!** It truly is much appreciated.

<a name="committing-and-pushing-code"></a>
## Committing and pushing code

We have very specific rules for formatting commit messages because:

1. We can automatically generate our changelogs.
2. We can easily understand the commit history.

In order to contribute code to `brikcss`, it is important to familiar with our development strategy and strictly follow the required conventions.

<a name="release-channels"></a>
### Release channels

We use [npm dist-tag](https://docs.npmjs.com/cli/dist-tag) to maintain the following [release channels](https://github.com/npm/npm/issues/2718):

|  Channel   | git branch | NPM dist-tag |                                         Description                                          |
|------------|------------|--------------|----------------------------------------------------------------------------------------------|
| **Stable** | `master`   | `latest`     | Considered most stable. Code is only released here after vetted in the _dev_ channel.        |
| **Dev**    | `dev`      | `dev`        | Code is always pushed here first, and (perhaps) eventually released to the _stable_ channel. |

To view the version currently tagged in NPM for each release channel:

```bash
# Will output the version currently tagged for each release channel:
npm dist-tag ls @brikcss/<package>
```

<a name="development-requirements"></a>
### Development requirements

Because so much of the release process is automated, we must strictly adhere to the following guidelines:

1. Commit _all_ code to a new feature/bug branch, which is created from the `master` branch.
2. When committing code, strictly follow our [commit policy (outlined below)](#commit-policy).
3. Create a pull request (after your code is ready) to merge your work into the `dev` branch. Let us know that your pull request is ready.

<a name="commit-policy"></a>
### Commit Policy

We use [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) with some exceptions as outlined in these docs. The parts that make up a commit message include _type_, _scope_, _subject_, _body_, and _footer_, and looks like this:

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

Some tools are provided to make it easy to [write and validate commit messages](#commit-policy).

_Note: When you commit code, [git hooks](#tooling) run and trigger other tasks. This takes time to complete, so do not be alarmed when committing code takes longer than it otherwise would._

<a name="npm-run-commit"></a>
##### `npm run commit`

Running `npm run commit` will ask you for all information needed to create a proper commit message. It is **strongly** encouraged to use this command instead of `git commit`.

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

Understanding [how to commit and push code](#committing-and-pushing-code) should be enough to contribute. If you want to take a deeper look "under the hood", here are the main tools we use:

- [`semantic-release`](https://github.com/semantic-release/semantic-release/) is used to manage code releases.
- [`commitlint`](https://www.npmjs.com/package/@commitlint/cli) (which is an abstract of [`commitizen`](https://www.npmjs.com/package/commitizen)) is used to create and [lint/validate commit messages](#committing-and-pushing-code).
- [`husky`](https://www.npmjs.com/package/husky) is used to create [git hooks]([git hooks](https://git-scm.com/docs/githooks)) that are source controlled. The following git hooks are used:
	- _commitmsg_: All commit messages are validated to ensure they follow our [guidelines for pushing code](#committing-and-pushing-code). This is important since our changelogs are automatically generated from commit history. This hook also appends the branch name to your commit message (which is useful to browse the commit history).
	- _prepush_: This hook automatically runs tests and the build. You will not be allowed to push code unless tests and the build pass.
