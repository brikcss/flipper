# Commit Subject

<pre>
&lt;type&gt;(&lt;scope&gt;): <strong>&lt;subject&gt;</strong>

&lt;body&gt;

&lt;footer&gt;
</pre>

The commit **subject** is part of the first line of the commit message, prefaced by the [commit type](commit-type.md) and [commit scope](commit-scope.md) metadata. The commit _header_, which composes the first line (_type_, _scope_, and _subject_), is limited to 100 characters.

## How to write a good commit subject

The purpose of the commit **subject** is to describe, in less than 100 characters, what changed in the commit. The following guidelines should be adhered to:

- Use human readable sentences. Capitalize the beginning of each sentence end it a period.
- Use present tense (i.e., "fix" not "fixed"; "add" not "added", etc.).
- Be concise and descriptive. This will be the only line many developers will see in an abridged commit log.

## Tooling

It is **highly encouraged** to use `npm run commit` instead of `git commit` any time you commit code. Doing so ensures your commit message is set up and formatted correctly. However, if you choose to manually write the commit message, you will need to format the _subject_ as follows:

- The _header_ (_type_, _scope_, and _subject_) should be less than 100 characters.
- The _header_ should have a blank line below it.

