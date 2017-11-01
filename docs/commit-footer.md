# Commit Footer

<pre>
&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;

&lt;body&gt;

<strong>&lt;footer&gt;</strong>
</pre>

The commit **footer** is the last line in the commit message, and should have a blank line above it. It should include _all_ issues remotely related to this commit, and should use keywords to describe each issue's status (see below [how to write a commit footer](#how-to-write-a-good-commit-footer)).

<a name="how-to-write-a-good-commit-footer"></a>
## How to write a good commit footer

The commit _footer_ is optional, but required if:

- The commit has a breaking change.
- The commit has any related issues.

The following guidelines should be adhered to:

- If the commit has a breaking change, add "BREAKING CHANGE: " to the commit _footer_.
- Reference issues in the _footer_ with [keywords](https://help.github.com/articles/closing-issues-using-keywords/) such as "fixes", "closes", and "related" (in the [example below](#example-of-a-proper-commit-message), issue #456 would be automatically closed in github).
- To reference issues from other platforms (such as Target Process), add a platform prefix. In the [example below](#example-of-a-proper-commit-message), issue #321 is in Target Process.

## Tooling

It is **highly encouraged** to use `npm run commit` instead of `git commit` any time you commit code. Doing so ensures your commit message is set up and formatted correctly. However, if you choose to manually write the commit message, you will need to format the _footer_ as follows:

- Lines should wrap at 100 characters.
- The _footer_ should have a blank line above it.
