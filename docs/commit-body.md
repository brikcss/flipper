# Commit Body

<pre>
&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;

<strong>&lt;body&gt;</strong>

&lt;footer&gt;
</pre>

The commit **body** is in between the _header_ (first line) and _footer_, separated with blank lines. The _body_ provides additional details related to the commit.

## How to write a good commit body

The commit _body_ should include the following information:

- The motivation for the change;
- A comparison of new and previous behavior;
- Any helpful code examples;
- Any other useful information to help other developers understand the change.

The following guidelines should be adhered to:

- Write as if you were training a developer who had never before seen this codebase.
- Use human readable sentences. Capitalize the beginning of each sentence end it a period.
- Use present tense (i.e., "fix" not "fixed"; "add" not "added", etc.).
- Use lists whenever appropriate.
- Paragraphs should also be separated with blank lines.

## Tooling

It is **highly encouraged** to use `npm run commit` instead of `git commit` any time you commit code. Doing so ensures your commit message is set up and formatted correctly. However, if you choose to manually write the commit message, you will need to format the _footer_ as follows:

- Lines should wrap at 100 characters.
- The _body_ should have a blank line above and below it.
