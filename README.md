# Flipper

> Flipper is a front end web component that flips things in style. Flipper can flip an element in place or flip it open to a modal dialog.

<!-- MarkdownTOC depth=5 -->

1. [Install](#install)
1. [Usage](#usage)
1. [Flipper API](#flipper-api)
	1. [Flipper options](#flipper-options)
	1. [Flipper methods and properties](#flipper-methods-and-properties)
		1. [`flipper.create( element, options )`](#flippercreate-element-options-)
			1. [`element`](#element)
			1. [`options`](#options)
		1. [`flipper.open( flipperId )` and `instance.open()`](#flipperopen-flipperid--and-instanceopen)
		1. [`flipper.close( flipperId )` and `instance.close()`](#flipperclose-flipperid--and-instanceclose)
		1. [`flipper.toggle( flipperId )` and `instance.toggle()`](#flippertoggle-flipperid--and-instancetoggle)
		1. [`flipper.all`](#flipperall)
1. [Angular Flipper](#angular-flipper)
	1. [`flipper` directive](#flipper-directive)
	1. [`open-flipper` directive](#open-flipper-directive)
	1. [`close-flipper` directive](#close-flipper-directive)
	1. [`toggle-flipper` directive](#toggle-flipper-directive)
1. [Questions, comments, concerns](#questions-comments-concerns)

<!-- /MarkdownTOC -->

<a name="install"></a>
## Install

```shell
npm install @brikcss/flipper
```

<a name="usage"></a>
## Usage

1. Pick your JS flavor (vanilla or AngularJS) and include the scripts:

	For vanilla JS:

	```html
	<!-- index.html -->
	<script src="src/vanilla/flipper.js"></script>
	```

	For angular:

	```html
	<!-- index.html -->
	<script src="src/angular/flipper-module.js"></script>
	<script src="src/angular/flipper-service.js"></script>
	<script src="src/angular/flipper-directives.js"></script>
	```

2. Pick your CSS flavor (SASS, LESS, or vanilla) and include the styles:

	_Note: The SASS/LESS flavors give you the added flexibility of being able to customize flipper classes and other settings, which you do not get with the vanilla CSS flavor, which uses all default classes and settings._

	For SASS:

	```sass
	// main.scss
	@import 'src/sass/flipper.scss';

	// @include the flipper mixin wherever you want your flipper classes.
	@include flipper(/* Mixin settings go here */);
		// These are the default flipper mixin settings.
		$base: flipper, // This will be the base flipper class.
		$flipFromRight: true, // Whether it will flip from right or left.
		$duration: 0.3s, // Duration of transition.
		$modal: (
			width: 400px, // width of flipper modal.
			height: 400px // height of flipper modal.
		),
		$bg: (front: #ccc, back: #aaa) // background-colors used in flipper.
	);
	```

	For LESS:

	```less
	// main.less
	@import 'src/less/flipper.less';

	// Include the flipper mixin wherever you want your flipper classes.
	.mix-flipper(/* Mixin settings go here */);
		// These are the default flipper mixin settings.
		@base: flipper, // This will be the base flipper class.
		@flipFromRight: true, // Whether it will flip from right or left.
		@duration: 0.3s, // Duration of transition.
		@modalHeight: 400px, // height of flipper modal.
		@modalWidth: 400px, // width of flipper modal.
		@bgFront: #ccc, // default background-color of flipper front side.
		@bgBack: #aaa) // default background-color of flipper back side.
	);
	```

	For vanilla CSS:

	```html
	<link rel="stylesheet" type="text/css" href="flipper.css">
	```

3. Create a flipper instance:

	_Each flipper element must have at least two immediate child elements._ Flipper will always use the first immediate child as the flipper's front side and the second immediate child as the back side.

	For vanilla JS:

	```html
	<!-- HTML: -->
	<div class="my-flipper">
		<!-- Flipper's front side. -->
		<div>...</div>
		<!-- Flipper's back side. -->
		<div>...</div>
	</div>
	```

	```js
	// JS:
	flipper.create('.my-flipper', options);

	// or:
	flipper.create(document.querySelectorAll('.my-flipper'), options);
	```

	For AngularJS:

	```html
	<!-- This instantiates flipper with all flipper defaults. -->
	<div flipper>
		<!-- Flipper's front side. -->
		<div>...</div>
		<!-- Flipper's back side. -->
		<div>...</div>
	</div>

	<!-- OR -->

	<!-- You can also pass the options object directly to flipper. -->
	<div flipper="{...}">...</div>
	```

<a name="flipper-api"></a>
## Flipper API

The flipper API is exactly the same for the vanilla JS plugin as it is for the Angular flipper service. The only difference is how flipper is referenced. In vanilla, flipper is referenced by the global `flipper` variable, whereas in Angular it is referenced by `flipperService`. But the API is the same.

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
			<td><code>openElements</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'.flipper__front'</em></code>) Binds an open click event <em>to any element(s) inside of the flipper element</em> which match the selector you provide.</td>
		</tr>
		<tr>
			<td><code>closeElements</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'.flipper__close'</em></code>) Binds a close click event <em>to any element(s) inside of the flipper element</em> which match the selector you provide.</td>
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

<a name="angular-flipper"></a>
## Angular Flipper

Angular flipper provides some directives which should typically be all you need to interact with flipper. The directives are documented below. However, you may also interact with flipper more programmatically by using `flipperService` directly.

_For documentation on the Angular `flipperService`, refer to the [vanilla flipper API](#flipper-api), which is exactly the same as the Angular `flipperService`. The only difference is that the angular service is called `flipperService` instead of `flipper`._

<a name="flipper-directive"></a>
### `flipper` directive

The `flipper` directive automatically creates an instance of flipper for you, allowing you to optionally pass flipper options via the `[flipper]` attribute. This may typically be the only directive you need.

```html
<!-- HTML -->
<div flipper></div>

<!-- Pass options to flipper. -->
<div flipper="{...}"></div>
```

[See available options above](#flipper-options).

<a name="open-flipper-directive"></a>
### `open-flipper` directive

Use the `openElements` option to bind an open click event to any elements _inside_ of a flipper element. Use the `open-flipper` directive when you need to bind an open click event to any elements _outside_ of a flipper element.

```html
<div flipper="{id: 'my-flipper'}">...</div>
...
<button open-flipper="my-flipper" type="button">Open my-flipper</button>
```

<a name="close-flipper-directive"></a>
### `close-flipper` directive

Use the `closeElements` option to bind a close click event to any elements _inside_ of a flipper element. Use the `close-flipper` directive when you need to bind a close click event to any elements _outside_ of a flipper element.

```html
<div flipper="{id: 'my-flipper'}">...</div>
...
<button close-flipper="my-flipper" type="button">Close my-flipper</button>
```

<a name="toggle-flipper-directive"></a>
### `toggle-flipper` directive

Use the `toggle-flipper` directive to bind a toggle click event to any DOM elements.

```html
<div flipper="{id: 'my-flipper'}">...</div>
...
<button toggle-flipper="my-flipper" type="button">Toggle my-flipper</button>
```

<a name="questions-comments-concerns"></a>
## Questions, comments, concerns

Pull requests and bugs are more than welcome, as are questions and feedback. Please include as much information as possible with each bug, pull request, and other inquiries. Your help is much appreciated!
