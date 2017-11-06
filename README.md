# Flipper

[![npm (scoped)](https://img.shields.io/npm/v/@brikcss/flipper.svg?style=flat-square)](https://www.npmjs.com/package/@brikcss/flipper
) [![npm (scoped)](https://img.shields.io/npm/dm/@brikcss/flipper.svg?style=flat-square)](https://www.npmjs.com/package/@brikcss/flipper
) [![Travis branch](https://img.shields.io/travis/rust-lang/rust/master.svg?style=flat-square&label=master)](https://github.com/brikcss/flipper/tree/master
) [![Travis branch](https://img.shields.io/travis/rust-lang/rust/dev.svg?style=flat-square&label=dev)](https://github.com/brikcss/flipper/tree/dev
) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/
) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release
) [![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)

> Flipper is a front end web component that flips things in style. Flipper can flip an element in place or flip it open to a modal dialog.

<!-- MarkdownTOC depth=5 -->

1. [Install](#install)
1. [Usage](#usage)
	1. [Quick start](#quick-start)
	1. [How to include flipper dependencies](#how-to-include-flipper-dependencies)
	1. [How to set up and configure flipper](#how-to-set-up-and-configure-flipper)
	1. [How to create a flipper instance](#how-to-create-a-flipper-instance)
1. [Flipper API](#flipper-api)
	1. [Flipper options](#flipper-options)
	1. [Flipper methods and properties](#flipper-methods-and-properties)
		1. [`flipper.init( options )`](#flipperinit-options-)
		1. [`flipper.create( element, options )`](#flippercreate-element-options-)
			1. [`element`](#element)
			1. [`options`](#options)
		1. [`flipper.open( flipperId )` and `instance.open()`](#flipperopen-flipperid--and-instanceopen)
		1. [`flipper.close( flipperId )` and `instance.close()`](#flipperclose-flipperid--and-instanceclose)
		1. [`flipper.toggle( flipperId )` and `instance.toggle()`](#flippertoggle-flipperid--and-instancetoggle)
		1. [`flipper.all`](#flipperall)
	1. [AngularJS flipper directives](#angularjs-flipper-directives)
		1. [`flipper` directive](#flipper-directive)
		1. [`open-flipper` directive](#open-flipper-directive)
		1. [`close-flipper` directive](#close-flipper-directive)
		1. [`toggle-flipper` directive](#toggle-flipper-directive)
1. [Questions? Comments? Feature requests? Bugs? Pull Requests? How to contribute to `brikcss`](#questions-comments-feature-requests-bugs-pull-requests-how-to-contribute-to-brikcss)

<!-- /MarkdownTOC -->

<a name="install"></a>
## Install

```shell
npm install @brikcss/flipper
```

<a name="usage"></a>
## Usage

<a name="quick-start"></a>
### Quick start

1. Pick your JS and CSS flavors and include their dependencies.
2. Configure flipper.
3. Create flipper instances.

_Note: Flipper JS follows the [Universal Module Definition pattern (UMD)](https://github.com/umdjs/umd), which gives you flexibility to load it as an ES2015 module or as a global variable. See [how to include flipper](#how-to-include-flipper-dependencies) for details._

<a name="how-to-include-flipper-dependencies"></a>
### How to include flipper dependencies

You must include dependencies for both JS and CSS flavors of your choice.

**CSS flavors:**

- SASS _(recommended)_:

	```sass
	/* main.scss */
	@import 'src/sass/flipper';

	/**
	 * NOTE: Flipper is created in SASS as a mixin, which allows you to
	 * configure the class names when you `@include` the flipper mixin.
	 * This gives you a high level of flexibility with how you use flipper.
	 */
	```

- Vanilla CSS:

	```html
	<!-- index.html -->
	<link rel="stylesheet" type="text/css" href="dist/css/flipper-vanilla.min.css">
	```

**JS flavors:**

- ES2015 _(recommended)_:

	```js
	// Any js script.
	import flipper from 'dist/js/vanilla/flipper-vanilla';

	/**
	 * NOTE: To use this JS flavor you will need a compiler
	 * to convert this to browser supported JS. We use and recommend
	 * `webpack` and `babel`.
	 */
	```

- Vanilla JS:

	```html
	<!-- index.html -->
	<script src="dist/js/vanilla/flipper-vanilla.min.js"></script>
	```

- AngularJS:

	```html
	<!-- index.html -->
	<script src="dist/js/angularjs/flipper-angularjs.min.js"></script>
	```

<a name="how-to-set-up-and-configure-flipper"></a>
### How to set up and configure flipper

- SASS is the only flavor that _requires_ setup...
- ...unless you change the default `$base` class in SASS; in which case you must also set up your JS flavor to use the same base class.
- Vanilla CSS has no configuration.
- All other setup is optional.

**SASS:**

```sass
/* my-flipper-styles.scss */
@include flipper(
	/* Put your mixin settings here. These are the defaults: */
	$base: flipper, // Base class flipper will use. Make sure to set this up in the JS as well if you change the default.
	$flipFromRight: true, // Whether it will flip from right or left.
	$duration: 0.3s, // Duration of transition.
	$modal: (
		width: 400px, // width of flipper modal.
		height: 400px // height of flipper modal.
	),
	$bg: (front: #ccc, back: #aaa) // background-colors used in flipper.
);
```

**ES2015 or Vanilla JS:**

```js
// Call `flipper.init` to update its configuration.
// Configuration can be an object or function that returns an object.
flipper.init(function (instance) {
	// Using a function gives you access to the flipper `instance`,
	// which gives details about the element being created.
	return {
		// This sets the flipper `type` for each element
		// to the value of its data attribute: `flipper-type`.
		type: instance.$element.dataset.flipperType
	};
});
```

_Note: Calling `flipper.init()` configures defaults for **all future flipper instances**. You can further configure a flipper instance with the `flipper.create()` method._

**AngularJS:**

```js
// Make sure to inject `brikcss.flipper` into your app.
angular.module('myApp', ['brikcss.flipper'])
	// And inject `flipperService` wherever you want to use that.
	.run(function (flipperService) {
		// `flipperService.init` lets you configure defaults
		// for all future flipper instances. You can pass a configuration
		// object or function that returns an object.
		flipperService.init({...});
	});
```

<a name="how-to-create-a-flipper-instance"></a>
### How to create a flipper instance

_Important: The only requirement for your HTML structure is that each flipper element must contain exactly two children elements._ The first child will be the flipper's front side and the second child is the back side. There is no other requirement for markup structure.

**ES2015 or Vanilla JS:**

```html
<!-- HTML: -->
<div class="my-flipper">
	<!-- This will be flipper's front side. -->
	<div>...</div>
	<!-- This will be flipper's back side. -->
	<div>...</div>
</div>
```

```js
// JS:
flipper.create('.my-flipper', options);

// or:
flipper.create(document.querySelectorAll('.my-flipper'), options);

/**
 * Note: Any options passed to the `flipper.create` method
 * will be merged with any default configuration.
 */
```

**AngularJS:**

_Note: The AngularJS flavor uses the same UMD version of flipper as other JS flavors, only it is wrapped around a thin AngularJS service. This makes the API exactly the same in all JS flavors. The AngularJS flavor also provides directives for added convenience, allowing you to flexibly interact with flipper in HTML templates or in AngularJS controllers and services._

AngularJS templates:

```html
<!-- This instantiates flipper with all flipper defaults. -->
<div flipper>
	<!-- Flipper's front side. -->
	<div>...</div>
	<!-- Flipper's back side. -->
	<div>...</div>
</div>

<!-- OR -->

<!-- You can also pass the options object directly to flipper
(see flipper's API below for details about options). -->
<div flipper="{...}">...</div>
```

<a name="flipper-api"></a>
## Flipper API

The flipper API is exactly the same for the vanilla JS plugin as it is for the AngularJS flipper service. The only difference is how flipper is referenced. In vanilla, flipper is referenced by the global `flipper` variable, whereas in AngularJS it is referenced by `flipperService`. But the API is the same.

<a name="flipper-options"></a>
### Flipper options

<table>
	<thead>
		<tr>
			<td>Option</td>
			<td>Type</td>
			<td>Values (default first) / description</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>id</code></td>
			<td><code>string</code></td>
			<td>(<code><em>''</em></code>) Give a flipper instance an ID if you need to reference the instance from the flipper plugin or service. This is an alternative to caching the object returned by the `flipper.create()` method.</td>
		</tr>
		<tr>
			<td><code>type</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'inline'</em>|'modal'</code>) Sets the type of flipper. An inline flipper flips in place, while a modal flipper flips open as it transitions to a modal dialog.</td>
		</tr>
		<tr>
			<td><code>addDimensions</code></td>
			<td><code>boolean</code></td>
			<td>(<code><em>false</em>|true</code>) When true, adds <code>height</code> and <code>width</code> to main flipper $element. This is helpful for flipper modals, to keep main $element in place while flipper modal is open.</td>
		</tr>
		<tr>
			<td><code>openElements</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'.flipper__front'</em></code>) Binds an open click event <em>to all matching element(s) inside the flipper element</em>.</td>
		</tr>
		<tr>
			<td><code>closeElements</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'.flipper__close'</em></code>) Binds a close click event <em>to all matching element(s) inside the flipper element</em>.</td>
		</tr>
		<tr>
			<td><code>animationTime</code></td>
			<td><code>number</code></td>
			<td>(<code><em>300</em></code>) In milliseconds. Must match the CSS transition duration.</td>
		</tr>
		<tr>
			<td><code>innerClass</code></td>
			<td><code>string</code></td>
			<td>(<code><em>''</em></code>) When set, string will be added to the <code>class</code> attribute of the inner <code>$container</code> (or <code>$modal</code>) DOM element. This allows for more custom styling.</td>
		</tr>
		<tr>
			<td><code>flipperClass</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'flipper'</em></code>) Sets the base class prefix. You will need this if you changed the base class in the mixin in `flipper.scss`.</td>
		</tr>
		<tr>
			<td><code>classes</code></td>
			<td><code>object</code></td>
			<td>This object allows you to modify the classes for each flipper DOM element individually. Due to the number of classes, the available classes will not be documented here. Take a look at the plugin itself for more information.</td>
		</tr>
	</tbody>
</table>

<a name="flipper-methods-and-properties"></a>
### Flipper methods and properties

Flipper attaches the `open`, `close`, and `toggle` methods both to the flipper plugin itself, as well as to each flipper instance. When calling one of these methods on the actual instance, you do not need to pass the `flipperId`. In the examples below, the word `instance` is used to refer to the flipper instance returned by `flipper.create()`.

<a name="flipperinit-options-"></a>
#### `flipper.init( options )`

Re-initializes the flipper plugin with custom default settings. This means each new flipper instance will be created with these default settings.

_Note: This methods sets **global default** settings for all flipper instances. These global defaults may still be overridden with the `flipper.create(element, options)` method, which applies settings to each flipper instance._

```js
// All new flippers will have these as default settings.
flipper.init({
	type: 'modal',
	addDimensions: true
});
```

The `options` can also be a function which returns the options object:

```js
// Apply custom default settings to each new flipper instance.
flipper.init(function (instance) {
	return {
		addDimensions: instance.type === 'modal'
	};
});
```

<a name="flippercreate-element-options-"></a>
#### `flipper.create( element, options )`

Creates a new flipper instance, which returns the flipper instance.

```js
flipper.create(element, options);
```

<a name="element"></a>
##### `element`

`HTMLElement` or `string`

If you pass a string, flipper will grab element(s) with `document.querySelectoAll(string)`.

<a name="options"></a>
##### `options`

If you pass a `function`, you must return the options as an object. Using a `function` gives you the advantage of having access to the element being instantiated, as well as other flipper options. For example:

```js
// Even though this instantiates many .my-flipper elements, each is configured individually.
flipper.create('.my-flipper', function (flipper) {
	// The flipper object gives you access to flipper.$element and other flipper settings.
	return {
		id: flipper.$element.getAttribute('flipper-id'),
		type: flipper.$element.getAttribute('flipper-type') || 'inline',
	};
});
```

<a name="flipperopen-flipperid--and-instanceopen"></a>
#### `flipper.open( flipperId )` and `instance.open()`

Opens the corresponding flipper.

<a name="flipperclose-flipperid--and-instanceclose"></a>
#### `flipper.close( flipperId )` and `instance.close()`

Closes the corresponding flipper.

<a name="flippertoggle-flipperid--and-instancetoggle"></a>
#### `flipper.toggle( flipperId )` and `instance.toggle()`

Toggles the corresponding flipper.

<a name="flipperall"></a>
#### `flipper.all`

A map of all flipper instances, organized by their `flipperId`.

<a name="angularjs-flipper-directives"></a>
### AngularJS flipper directives

The directives that the AngularJS flavor provides should typically be all you need to interact with flipper. However, you may also interact with flipper more programmatically by using `flipperService` directly.

_For documentation on the AngularJS `flipperService`, refer to the [vanilla flipper API](#flipper-api), which is exactly the same as the AngularJS `flipperService`. The only difference is that the angularJS service is called `flipperService` instead of `flipper`._

<a name="flipper-directive"></a>
#### `flipper` directive

The `flipper` directive automatically creates an instance of flipper for you, allowing you to optionally pass flipper options via the `[flipper]` attribute. This may typically be the only directive you need.

```html
<!-- HTML -->
<div flipper></div>

<!-- Pass options to flipper. -->
<div flipper="{...}"></div>
```

[See available options](#flipper-options).

<a name="open-flipper-directive"></a>
#### `open-flipper` directive

Use the `openElements` option to bind an open click event to any elements _inside_ of a flipper element. Use the `open-flipper` directive when you need to bind an open click event to any elements _outside_ of a flipper element.

```html
<div flipper="{id: 'my-flipper'}">...</div>
...
<button open-flipper="my-flipper" type="button">Open my-flipper</button>
```

<a name="close-flipper-directive"></a>
#### `close-flipper` directive

Use the `closeElements` option to bind a close click event to any elements _inside_ of a flipper element. Use the `close-flipper` directive when you need to bind a close click event to any elements _outside_ of a flipper element.

```html
<div flipper="{id: 'my-flipper'}">...</div>
...
<button close-flipper="my-flipper" type="button">Close my-flipper</button>
```

<a name="toggle-flipper-directive"></a>
#### `toggle-flipper` directive

Use the `toggle-flipper` directive to bind a toggle click event to any DOM elements.

```html
<div flipper="{id: 'my-flipper'}">...</div>
...
<button toggle-flipper="my-flipper" type="button">Toggle my-flipper</button>
```

<a name="questions-comments-feature-requests-bugs-pull-requests-how-to-contribute-to-brikcss"></a>
## Questions? Comments? Feature requests? Bugs? Pull Requests? How to contribute to `brikcss`

**We love contributors and appreciate all contributions!!!**

We more than welcome all questions, feedback, bug reports, and pull requests. Before submitting any type of request, please read our [contributing guidelines](CONTRIBUTING.md). This will help us maintain an efficient level of communication, make the development process smooth and enjoyable, and make `brikcss` amazing!
