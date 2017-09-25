# Flipper

> Flipper is a front end web module that flips things. In style. Flipper can flip an element in place or open it up to a modal dialog.

<!-- MarkdownTOC depth=5 -->

1. [Setup / install](#setup--install)
1. [Usage](#usage)
1. [Configuration](#configuration)
	1. [Element / selector](#element--selector)
	1. [Options](#options)
		1. [Options as an object](#options-as-an-object)
		1. [Options as a function](#options-as-a-function)
1. [Questions, comments, concerns](#questions-comments-concerns)

<!-- /MarkdownTOC -->

<a name="setup--install"></a>
## Setup / install

1. Install it:
	```shell
	npm install flipper
	```
2. Include the script:
	```html
	<!-- index.html -->
	<script src="flipper.min.js"></script>
	```
3. Include the styles:
	```scss
	// main.scss
	@include flipper(); // You can pass options here, see "Usage" below.
	```

<a name="usage"></a>
## Usage

Once flipper is set up, you must instantiate it on one or more DOM elements. To instantiate:

```js
flipper.create(elementOrSelector, options);
```

<a name="configuration"></a>
## Configuration

|       Argument      |          Type         |
|---------------------|-----------------------|
| `elementOrSelector` | string or HTMLElement |
| `options`           | object or function    |

<a name="element--selector"></a>
### Element / selector

When passing a string as the element selector, flipper will perform a `querysSelectorAll` on your string selector to grab DOM elements. For example:

```js
// This will do `document.querySelectorAll('.my-flipper')` and bind flipper to all DOM elements that match your selector.
flipper.create('.my-flipper');
```

is the same as:

```js
flipper.create(document.querySelectorAll('.my-flipper'));
```

<a name="options"></a>
### Options

The options argument can be an [`object`](#options-as-an-object) or a [`function`](#options-as-a-function).

<a name="options-as-an-object"></a>
#### Options as an object

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
			<td><code>type</code></td>
			<td><code>string</code></td>
			<td>(<code><em>'inline'</em>|'modal'</code>) Sets the type of flipper. An inline flipper flips in place, while a modal flipper flips open as it transitions to a modal dialog.</td>
		</tr>
		<tr>
			<td><code>addClick</code></td>
			<td><code>boolean</code></td>
			<td>(<code><em>false</em></code>) When true, adds a click event to the <code>$front</code> element which flips the flipper.</td>
		</tr>
		<tr>
			<td><code>closeButtons</code></td>
			<td><code>string</code></td>
			<td>(<code><em>''</em></code>) When set, closes the flipper when clicking on any DOM element <em>which is contained inside of the main flipper <code>$element</code></em>.</td>
		</tr>
		<tr>
			<td><code>unequalHeight</code></td>
			<td><code>boolean</code></td>
			<td>(<code><em>false</em></code>) Set to <code>true</code> to add the unequal height class.<br><em>Note: all this setting does is add a class, so you can alternatively add the unequal height class directly to your markup to produce the same results.</em></td>
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
			<td>(<code><em>'flipper'</em></code>) Sets the base class prefix. Combined with the sass mixin you can apply any class as the main flipper element.</td>
		</tr>
		<tr>
			<td><code>classes</code></td>
			<td><code>object</code></td>
			<td>This object allows you to modify the classes for each flipper DOM element individually. Due to the number of classes, the available classes will not be documented here. Take a look at the plugin itself for more information.</td>
		</tr>
	</tbody>
</table>

<a name="options-as-a-function"></a>
#### Options as a function

Options can also be a callback function, which gives you access to each DOM element being configured. This is helpful to instantiate flipper on multiple elements in a single call to flipper while passing different options to different elements.

Take this example:

```js
// Even though this instantiates ALL .flipper elements, each is configured individually.
flipper.create('.flipper', function (flipper) {
	// The flipper object gives you access to flipper.$element and other default settings.
	return {
		id: flipper.$element.getAttribute('flipper-id'),
		type: flipper.$element.getAttribute('flipper-type') || 'inline',
		addClick: true,
		closeButtons: '.flipper__close'
	};
});
```

<a name="questions-comments-concerns"></a>
## Questions, comments, concerns

Pull requests and bugs are more than welcome, as are questions and feedback. Please include as much information as possible with each bug, question, and pull request.
