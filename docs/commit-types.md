# Commit Types

<pre>
<strong>&lt;type&gt;</strong>(&lt;scope&gt;): &lt;subject&gt;

&lt;body&gt;

&lt;footer&gt;
</pre>

The commit **type** is required metadata, and is the first part of any commit message inside the _header_ / _subject_ line. It is a single keyword, selected from a [predefined list](#available-commit-types), which categorizes the type of commit.

<a name="choosing-a-commit-type"></a>
## Choosing a commit type

It is **highly encouraged** to use `npm run commit` instead of `git commit` any time you commit code. When you use the `npm run commit` command you will be prompted for the commit _type_. Typing `help` at that prompt will list the available _types_ you must choose from.

If you choose to manually create your commit message, it must be one of the [available commit types](#available-commit-types). It also must be lowercase.

<a name="available-commit-types"></a>
## Available commit types

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
