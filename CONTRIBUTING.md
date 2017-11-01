# Contributing to brikcss

**We love contributors and appreciate all contributions!!!**
To make the development process smooth, and to make brikcss amazing, here are guidelines we ask all to follow.

<!-- MarkdownTOC depth=5 -->

1. [Committing work](#committing-work)
	1. [Commit Conventions](#commit-conventions)
		1. [Available Types](#available-types)
		1. [Available Scopes](#available-scopes)
		1. [Referencing issues and breaking changes in the footer](#referencing-issues-and-breaking-changes-in-the-footer)
		1. [Other points of emphasis](#other-points-of-emphasis)
		1. [Example of a proper commit message](#example-of-a-proper-commit-message)
	1. [Commit Tooling](#commit-tooling)
		1. [`npm run commit`](#npm-run-commit)
		1. [Commit linter](#commit-linter)
		1. [Branch Name](#branch-name)

<!-- /MarkdownTOC -->


<a name="committing-work"></a>
## Committing work

We have very specific rules for formatting commit messages because:

1. We can automatically generate our changelogs.
2. We can easily understand the commit history.

<a name="commit-conventions"></a>
### Commit Conventions

We use [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) with some exceptions as outlined in this section. The parts of a commit message include _type_, _scope_, _subject_, _body_, and _footer_, and looks like this:

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

where:

- _type_ is a predefined keyword to categorize the type of commit.
- _scope_ is metadata which describes where the changes occurred. _scope_ is optional, but encouraged, and can be selected from a predefined list.
- _subject_ briefly describes the changes in no more than 100 characters (including the _type_ and _scope_).
- _body_ provides additional details, including motivation for the change, a comparison of new and previous behavior, and any other useful information to help other developers understand the change. Write your _subject_ and _body_ as if you were training a developer who had never before seen this codebase.
- _footer_ contains _all_ references to issues and flags whether this commit has any breaking changes.

<a name="available-types"></a>
#### Available Types

You must use one of the following _types_:

- **feat**: Add a new feature.
- **fix**: Work on a bug fix.
- **docs**: Add or update documentation.
- **perf**: Improve performance.
- **test**: Add or update tests.
- **refactor**: Code change that doesn't fix a bug or add a feature.
- **style**: Code style change, such as whitespace, formatting, etc.
- **tools**: Add or update tooling, such as build, dependencies, etc.
- **revert**: Reverts a commit. This is a special type and requires the following format:
	```
	revert: This reverts commit <SHA for commit being reverted>
	```

<a name="available-scopes"></a>
#### Available Scopes

Use one of the following predefined _scopes_, if possible, though you may use your own _scope_ as needed:

- _css_: Styles change.
- _core_: Change to core flipper JS functionality.
- _angularjs_: Change to thin AngularJS wrapper around flipper.

<a name="referencing-issues-and-breaking-changes-in-the-footer"></a>
#### Referencing issues and breaking changes in the footer

- The commit _footer_ is optional, but required if:
	- The commit has a breaking change.
	- There are any related issues.
- If the commit has a breaking change, add "BREAKING CHANGE: " to the commit _footer_.
- Reference issues in the _footer_ with [keywords](https://help.github.com/articles/closing-issues-using-keywords/) such as "fixes", "closes", and "related" (in the [example below](#example-of-a-proper-commit-message), issue #456 would be automatically closed in github).
- To reference issues from other platforms (such as Target Process), add a platform prefix. In the [example below](#example-of-a-proper-commit-message), issue #321 is in Target Process.

<a name="other-points-of-emphasis"></a>
#### Other points of emphasis

- We prefer normal, human readable sentences. Capitalize each sentence and end it with a period (.).
- However, _scopes_ and _types_ should be lowercase.
- No line should be longer than 100 characters.
- Use present tense (i.e., "fix", not "fixed"). The one exception is in the _footer_ where you reference issues.

<a name="example-of-a-proper-commit-message"></a>
#### Example of a proper commit message

```
feat(angularjs): Add flipper-open directive for AngularJS.

The flipper-open directive does the following:
- Creates / inits the flipper.
- Automatically binds the open click event to `$element`.
- Destroys the flipper when the `$scope` is destroyed.

BREAKING CHANGE: The flipper-open directive replaces the old fliper-open directive.
Related to #123, TP #321. Closes #456.
```

<a name="commit-tooling"></a>
### Commit Tooling

We enforce commit conventions with [commitizen](https://www.npmjs.com/package/commitizen) and [commitlint](https://www.npmjs.com/package/@commitlint/prompt). This somewhat modifies the commit experience.

<a name="npm-run-commit"></a>
#### `npm run commit`

Running `npm run commit` will ask you for all information needed to create a proper commit message. It is **strongly** encouraged to use this command instead of `git commit`.

_Note: The `git cz` command is also available if you have [commitizen]([commitizen](https://www.npmjs.com/package/commitizen) installed globally (`npm install -g commitizen`). This would do the same thing as `npm run commit`._

<a name="commit-linter"></a>
#### Commit linter

If you do not use `npm run commit` or `git cz`, you will run into errors when you create a commit and do not follow outlined commit policy. This is because [commitlinter](https://www.npmjs.com/package/@commitlint/prompt) lints every commit message.

But never fear. When you create a commit message that does not meet our commit policy, the error message will let you know why your commit message was not accepted. Just update your commit message and all is well!

<a name="branch-name"></a>
#### Branch Name

For added convenience in browsing commit history, the name of the branch you commit from is appended at the end of your commit message.
