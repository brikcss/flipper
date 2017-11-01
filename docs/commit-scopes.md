# Commit Scopes

<pre>
&lt;type&gt;(<strong>&lt;scope&gt;</strong>): &lt;subject&gt;

&lt;body&gt;

&lt;footer&gt;
</pre>

The commit **scope** is another type of required metadata -- similar to [commit types](commit-types.md) -- and is the second part of the commit _header_ / _subject_ line. The _scope_ describes in 1-2 words the place in the code where changes occurred. There is a [predefined list of _scopes_](#available-commit-scopes) available for you to choose from, though you can choose your own when the default values do not accurately describe the scope of the change.

<a name="choosing-a-commit-scope"></a>
## Choosing a commit scope

It is **highly encouraged** to use `npm run commit` instead of `git commit` any time you commit code. When you use the `npm run commit` command you will be prompted for the commit _scope_. Typing `help` at that prompt will list the available _scopes_ you can choose from.

If you choose to manually create your commit message, it must be one of the [available commit scopes](#available-commit-scopes). It also must be lowercase, surrounded in parentheses, and be followed by a colon.

<a name="available-commit-scopes"></a>
## Available scopes

_Scope_ is required. It is encouraged to select one of the following predefined _scopes_:

- _css_: Styles change.
- _core_: Change to core flipper JS functionality.
- _angularjs_: Change to thin AngularJS wrapper around flipper.

If none of these predefined choices accurately describe the _scope_ of your commit, you are welcome to use a custom _scope_. The important thing is that the _scope_ accurately describes (in 1-2 words) the _scope_ of a change.
