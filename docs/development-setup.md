# Setup

<!-- MarkdownTOC -->

1. [Requirements](#requirements)
1. [Set up local development](#set-up-local-development)
1. [Important: committing code](#important-committing-code)

<!-- /MarkdownTOC -->

<a name="requirements"></a>
## Requirements

- MacOS or Windows 10.
- [Node >=8](https://nodejs.org/en/) and NPM.
- Bash shell ([Windows now supports bash](https://www.google.com/search?tbs=qdr%3Ay&ei=BzcCWr2MCZXSjwP-0YeYDw&q=set+up+bash+windows+10&oq=set+up+bash+windows+10&gs_l=psy-ab.3..0i13k1j0i8i10i30k1.29642.29642.0.30201.1.1.0.0.0.0.95.95.1.1.0....0...1.1.64.psy-ab..0.1.94....0.E0IhmniVpt4)).

<a name="set-up-local-development"></a>
## Set up local development

1. Clone it:
	```bash
	git clone https://github.com/brikcss/<repo name>.git <optional directory>
	cd <repo directory>
	```
2. Branch it:
	```bash
	git checkout -b my-feature-branch
	```
3. Install it:
	```bash
	npm install
	```
4. Run it:
	```bash
	npm run dev
	# or npm run watch
	# or npm start
	```

This runs [browser-sync](https://browsersync.io/) and watches `src` files, which allows you to develop locally with live reload and CSS injection.

<a name="important-committing-code"></a>
## Important: committing code

_Make sure to follow our [guidelines for contributing code](../CONTRIBUTING.md) when you are ready to commit and push code._
