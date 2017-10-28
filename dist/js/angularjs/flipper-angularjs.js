/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _flipperModule = __webpack_require__(1);

var _flipperModule2 = _interopRequireDefault(_flipperModule);

var _flipperService = __webpack_require__(2);

var _flipperService2 = _interopRequireDefault(_flipperService);

var _flipperDirectives = __webpack_require__(6);

var _flipperDirectives2 = _interopRequireDefault(_flipperDirectives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** ====================================================================
 * flipper-module.js
 * -----------------
 * @description Attaches all flipper components to its module.
 * @layer component
===================================================================== */

/* globals angular */
angular.module('brikcss.flipper', ['brikcss.flipper.service', 'brikcss.flipper.directives']);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _flipper = __webpack_require__(3);

var _flipper2 = _interopRequireDefault(_flipper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Flipper service / plugin.
 */
/* globals angular:false */
(function () {
  angular.module('brikcss.flipper.service', []).factory('flipperService', function () {
    return _flipper2.default;
  });
})(); /** ====================================================================
       * flipper-service.js
       * ------------------
       * @description Flipper plugin for Angular. This can be used in
       * 	tandem with the flipper angular directives.
       * @layer components
      ===================================================================== */

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _elementClosestPolyfill = __webpack_require__(4);

var _elementClosestPolyfill2 = _interopRequireDefault(_elementClosestPolyfill);

var _objectAssignPolyfill = __webpack_require__(5);

var _objectAssignPolyfill2 = _interopRequireDefault(_objectAssignPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** ====================================================================
 * flipper.js
 * ----------
 * @description Flipper plugin.
 * @layer components
===================================================================== */

_elementClosestPolyfill2.default.init();
_objectAssignPolyfill2.default.init();

/**
 * Flipper service / plugin.
 */
// Service object contains methods and props to be publicly returned.
var service = {
	create: createFlippers,
	open: openFlipper,
	close: closeFlipper,
	toggle: toggleFlipper,
	destroy: destroyFlipper,
	all: {},
	init: init,
	defaults: {
		type: 'inline', // 'inline'|'modal'
		addDimensions: false, // Add height, width to main element while open.
		animationTime: 300, // milliseconds.
		innerClass: '', // Class to add to $inner element.
		flipperClass: 'flipper', // Base class for flipper element.
		openButtons: '.flipper__front', // Selector to add open click event to.
		closeButtons: '.flipper__close' // Selector to add close click event to.
	},
	classes: {}
};
var nextFlipperId = 0;
var $flipperModals;

// Init.
init();

/**
 * Initialize flipper service with default settings, so each new flipper inherits these defaults.
 * @method  init
 * @param   {object|function}  deafults  Default options to set for each new flipper. Can be function which returns options object.
 * @return  {object}  flipperService.
 */
function init(defaults, classes) {
	defaults = defaults || {};
	classes = classes || {};
	var baseClass = defaults.flipperClass || classes.main || 'flipper';

	// Set classes based on flipperClass.
	updateBaseClass(baseClass, !defaults.openButtons && !defaults.closeButtons);

	// Merge classes.
	if (classes) {
		service.classes = Object.assign(service.classes, defaults.classes);
	}

	// If defaults is a function, cache it to apply to each flipper instance later.
	if (typeof defaults === 'function') {
		service.defaultsFn = defaults;
		// Otherwise merge defaults immediately.
	} else {
		service.defaults = Object.assign(service.defaults, defaults);
	}

	// If $flipperModals exists, update the class; otherwise create it.
	if ($flipperModals) {
		$flipperModals.removeAttribute('class');
	} else {
		$flipperModals = document.createElement('div');
		document.body.appendChild($flipperModals);
	}
	// Prevent propagation from flipper modal to document body.
	$flipperModals.addEventListener('click', function stopPropagate(event) {
		event.cancelBubble = true;
		event.stopPropagation();
	});
	$flipperModals.classList.add(service.classes.modals);

	return service;
}

/**
 * Helper function which updates the base class used by flipper.
 * @method  updateBaseClass
 * @param   {string}  baseClass  Base flipper class to use for all other classes.
 * @param   {boolean}  updateDefaults  Whether to also update the default settings that rely in certain classes.
 */
function updateBaseClass(baseClass, updateDefaults) {
	baseClass = baseClass || 'flipper';
	service.classes = {
		main: baseClass,
		inner: baseClass + '__container',
		modal: baseClass + '__container--modal',
		modals: baseClass + '__modals',
		modalsActive: baseClass + '__modals--active',
		front: baseClass + '__front',
		back: baseClass + '__back',
		close: baseClass + '__close',
		flipped: baseClass + '--flipped'
	};
	if (updateDefaults) {
		service.defaults.openButtons = '.' + service.classes.front;
		service.defaults.closeButtons = '.' + service.classes.close;
	}
	return service.classes;
}

/**
 * Create flipper(s) from element(s).
 * @method  createFlippers
 * @param  {string|HTMLElement|Array of HTMLElements}  elements  String selector or DOM element(s).
 * @param  {object}  options  Options for flipper instance.
 * @return  {object}  Flipper object.
 */
function createFlippers(elements, options) {
	options = options || {};
	// If elements is a string selector, grab the actual DOM element(s).
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	}
	// Convert elements to an array so we can iterate through it.
	if (elements instanceof HTMLElement) {
		elements = [elements];
	}
	// If elements has no length, let user know.
	if (!elements.length) {
		console.error('No flippers were found.', elements, options); // eslint-disable-line
		return false;
	}
	// If there is only one flipper, create it and return the flipper.
	if (elements.length === 1) {
		return createFlipper(elements[0], options);
	}
	// Otherwise, iterate through all, create a flipper for each, and return an array of flippers. (Edge doesn't like iterating through elements as an array, which is why we iterate through Object.keys).
	else {
			var flippers = [];
			Object.keys(elements).forEach(function (element, i) {
				// Merge options with defaults and create the flipper instance.
				flippers.push(createFlipper(elements[i], options));
			});
			return flippers;
		}
}

/**
 * Create a flipper instance and cache it.
 * @method  createFlipper
 * @param   {HTMLElement}  element  Flipper options object.
 * @param   {object|function}  options  Flipper options object, which can be a function which returns the options object.
 * @return  {object}  Flipper object.
 */
function createFlipper(element, options) {
	var flipper = Object.assign({ $element: element }, service.defaults);
	var instanceDefaults;
	// If options is a function, run it.
	if (typeof options === 'function') {
		options = options(flipper);
		// Don't allow undefined or null values.
		Object.keys(options).forEach(function (key) {
			if (options[key] === undefined || options[key] === null) {
				delete options[key];
			}
		});
	}
	// Merge options to flipper.
	if (options) {
		flipper = Object.assign(flipper, options);
	}
	// If service.defaultsFn is a function, run it and merge to flipper.
	if (typeof service.defaultsFn === 'function') {
		instanceDefaults = service.defaultsFn(flipper);
		// Don't allow undefined or null values.
		Object.keys(instanceDefaults).forEach(function (key) {
			if (instanceDefaults[key] === undefined || instanceDefaults[key] === null) {
				delete instanceDefaults[key];
			}
		});
		if (options) {
			flipper = Object.assign(flipper, options, instanceDefaults, options);
		} else {
			flipper = Object.assign(flipper, instanceDefaults);
		}
	}
	// Make sure the element exists and is a DOM element.
	if (!flipper.$element || !(flipper.$element instanceof HTMLElement)) {
		console.error('Flipper was not created because no element was found: ', flipper); // eslint-disable-line
		return false;
	}
	// Add a flipper ID if it doesn't exist.
	if (flipper.id === undefined) {
		flipper.id = 'flipper__' + nextFlipperId;
		nextFlipperId += 1;
	}
	// If flipper ID already exists, create a more unique ID.
	if (service.all[flipper.id]) {
		flipper.id = flipper.id + '__' + nextFlipperId;
		nextFlipperId += 1;
	}
	// Build dom and attach methods.
	buildFlipperDom(flipper);
	addFlipperMethods(flipper);
	addFlipperEvents(flipper);
	// Add flipper state.
	flipper.isOpen = false;
	// Cache flipper.
	service.all[flipper.id] = flipper;
	return flipper;
}

/**
 * Build the flipper's inner DOM.
 * @method  buildFlipperDom
 * @param   {object}  flipper  Flipper options object.
 * @return  {object}  Flipper object.
 */
function buildFlipperDom(flipper) {
	// Cache important flipper DOM elements.
	flipper.$front = flipper.$element.querySelector('.' + service.classes.front) || flipper.$element.children[0];
	flipper.$back = flipper.$element.querySelector('.' + service.classes.back) || flipper.$element.children[1];
	flipper.$inner = flipper.$element.querySelector('.' + service.classes.inner) || document.createElement('div');
	// Add flipper classes.
	flipper.$element.classList.add(service.classes.main);
	flipper.$element.classList.add(service.classes.main + '--' + flipper.type);
	flipper.$inner.classList.add(service.classes.inner);
	flipper.$front.classList.add(service.classes.front);
	flipper.$back.classList.add(service.classes.back);
	if (flipper.type === 'modal') {
		flipper.$inner.classList.add(service.classes.modal);
	}
	if (flipper.innerClass) {
		flipper.$inner.classList.add(flipper.innerClass);
	}
	// Create element's inner dom.
	if (!flipper.$element.querySelector('.' + service.classes.inner)) {
		for (var i = 0; i < flipper.$element.children.length;) {
			flipper.$inner.appendChild(flipper.$element.children[0]);
		}
		flipper.$element.appendChild(flipper.$inner);
	}
	// Add flipper id to $element.
	flipper.$element.dataset.flipperId = flipper.id;
	flipper.$inner.dataset.flipperId = flipper.id;
	return flipper;
}

/**
 * Add methods to flipper instance.
 * @method  addFlipperMethods
 * @param   {object}  flipper  Flipper options object.
 * @return  {object}  Flipper object.
 */
function addFlipperMethods(flipper) {
	flipper.open = function open() {
		openFlipper(flipper.id);
	};
	flipper.openFromChild = function openFromChild(event) {
		if (event.target.matches(flipper.openButtons) || event.target.closest(flipper.openButtons)) {
			flipper.open();
		}
	};
	flipper.close = function close() {
		closeFlipper(flipper.id);
	};
	flipper.closeFromChild = function closeFromChild(event) {
		if (event.target.matches(flipper.closeButtons) || event.target.closest(flipper.closeButtons)) {
			flipper.close();
		}
	};
	flipper.toggle = function toggle() {
		toggleFlipper(flipper.id);
	};
	flipper.destroy = function destroy() {
		destroyFlipper(flipper.id);
	};
	flipper.stopPropagation = function stopPropagate(event) {
		event.cancelBubble = true;
		event.stopPropagation();
	};
	return flipper;
}

/**
 * Add events to flipper instance.
 * @method  addFlipperEvents
 * @param   {object}  flipper  Flipper options object.
 * @return  {object}  Flipper object.
 */
function addFlipperEvents(flipper) {
	// Add open click event.
	if (flipper.openButtons) {
		flipper.$inner.addEventListener('click', flipper.openFromChild);
	}
	// Add close click event.
	if (flipper.closeButtons) {
		flipper.$inner.addEventListener('click', flipper.closeFromChild);
	}
}

/**
 * Flip flipper to open/active state.
 * @method  openFlipper
 * @param   {string}  id  Flipper id.
 */
function openFlipper(id) {
	var flipper = service.all[id];
	// Make sure flipper exists.
	if (!flipper) {
		return false;
	}
	// Update flipper state.
	flipper.isOpen = true;
	// Add height/width to main $element to retain its dimensions while $inner is position 'fixed'.
	if (flipper.addDimensions) {
		flipper.$element.style.width = flipper.$element.offsetWidth + 'px';
		flipper.$element.style.height = flipper.$element.offsetHeight + 'px';
		flipper.$element.style.minHeight = flipper.$element.offsetHeight + 'px';
	}
	// Add open attribute to DOM. Helpful for observables.
	flipper.$inner.setAttribute('data-flipper-open', true);
	// Logic for modal flipper.
	if (flipper.type === 'modal') {
		// Close any active flipper modal so only one can be open at a time.
		if (service.activeFlipperModal) {
			service.activeFlipperModal.close(true);
		}
		// Cache the new active flipper modal.
		service.activeFlipperModal = flipper;
		// Position $inner element 'fixed' at same position as main $element.
		var flipperBox = flipper.$element.getBoundingClientRect();
		flipper.$inner.style.position = 'fixed';
		flipper.$inner.style.left = flipperBox.left + 'px';
		flipper.$inner.style.top = flipperBox.top + 'px';
		flipper.$inner.style.width = flipper.$element.offsetWidth + 'px';
		flipper.$inner.style.height = flipper.$element.offsetHeight + 'px';
		flipper.$inner.style.minHeight = flipper.$element.offsetHeight + 'px';
		// Append $inner to $flipperModals element. This is necessary because the parent element has "perspective" styles, which gives fixed positioning a new "layer" and makes it behave more like absolute positioning. Moving $inner inside of $modal (which also has fixed positioning) resolves that issue.
		$flipperModals.appendChild(flipper.$inner);
		// Activate flipper and flipper modals.
		setTimeout(function () {
			$flipperModals.classList.add(service.classes.modalsActive);
			flipper.$inner.classList.add(service.classes.flipped);
			flipper.$element.classList.add(service.classes.flipped);
			// Add click event to body to close flipper while it's open.
			document.body.addEventListener('click', flipper.close);
		}, 10); // We need a slight delay after appending $inner to $flipperModals to make sure the animation is properly applied.
		// Logic for inline flipper.
	} else if (flipper.type === 'inline') {
		flipper.$element.classList.add(service.classes.flipped);
	}
}

/**
 * Unflip flipper to inactive/closed state.
 * @method  closeFlipper
 * @param   {string}  id  Flipper id.
 */
function closeFlipper(id) {
	// If `id` doesn't exist and there is an active flipper modal, make `id` be the active flipper modal.
	if (!id && service.activeFlipperModal && service.activeFlipperModal.type === 'modal') {
		id = service.activeFlipperModal.id;
	}
	var flipper = service.all[id];
	// Make sure flipper exists.
	if (!flipper) {
		return false;
	}
	// Update flipper state.
	flipper.isOpen = false;
	// Handle logic for flipper modal.
	if (flipper.type === 'modal') {
		// Deactivate flipper.
		flipper.$inner.classList.remove(service.classes.flipped);
		flipper.$element.classList.remove(service.classes.flipped);
		service.activeFlipperModal = null;
		// Remove click event to body to close flipper while it's open.
		document.body.removeEventListener('click', flipper.close);
		// Wait until animation is complete (plus a 10ms buffer), then reset the state of the flipper.
		setTimeout(function () {
			// Append $inner back to $element.
			flipper.$element.appendChild(flipper.$inner);
			// Reset styles.
			if (flipper.addDimensions) {
				flipper.$element.style.width = '';
				flipper.$element.style.height = '';
				flipper.$element.style.minHeight = '';
			}
			flipper.$inner.style.position = '';
			flipper.$inner.style.left = '';
			flipper.$inner.style.top = '';
			flipper.$inner.style.width = '';
			flipper.$inner.style.height = '';
			flipper.$inner.style.minHeight = '';
			// Remove open attribute.
			flipper.$inner.removeAttribute('data-flipper-open');
			// Deactivate $flipperModals container.
			if (!service.activeFlipperModal || service.activeFlipperModal.type !== 'modal') {
				$flipperModals.classList.remove(service.classes.modalsActive);
			}
		}, flipper.animationTime + 10);
		// Handle logic for inline flipper.
	} else if (flipper.type === 'inline') {
		flipper.$element.classList.remove(service.classes.flipped);
		// Reset styles.
		if (flipper.addDimensions) {
			flipper.$element.style.width = '';
			flipper.$element.style.height = '';
			flipper.$element.style.minHeight = '';
		}
		// Remove open attribute.
		flipper.$inner.removeAttribute('data-flipper-open');
	}
}

/**
 * Toggle flipper open and close.
 * @method  toggleFlipper
 * @param   {string}  id  Flipper id.
 * @return  {object}  Flipper object.
 */
function toggleFlipper(id) {
	var flipper = service.all[id];
	// Make sure flipper exists.
	if (!flipper) {
		return false;
	}
	if (flipper.isOpen) {
		flipper.close();
	} else {
		flipper.open();
	}
	return flipper;
}

/**
 * Destroy flipper and remove from memory.
 * @method  destroyFlipper
 * @param   {string}  id  Flipper id.
 */
function destroyFlipper(id) {
	var flipper = service.all[id];
	// Make sure flipper exists.
	if (!flipper) {
		return false;
	}
	// Close flipper if it is active.
	if (flipper.id === service.activeFlipperModal) {
		flipper.close();
	}
	// Remove open click event.
	if (flipper.openButtons) {
		flipper.$inner.removeEventListener('click', flipper.openFromChild);
	}
	// Remove close click event.
	if (flipper.closeButtons) {
		flipper.$inner.removeEventListener('click', flipper.closeFromChild);
	}
	// Remove from service cache.
	delete service.all[id];
}

exports.default = service;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/** ====================================================================
 * element-closest-polyfill.js
 * ---------------------------
 * @description Polyfill for Element.closest().
 * @layer core
===================================================================== */

exports.default = {
	init: function init() {
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		}
		if (!Element.prototype.closest) {
			Element.prototype.closest = function (s) {
				var el = this;
				var ancestor = this;
				if (!document.documentElement.contains(el)) {
					return null;
				}
				do {
					if (ancestor.matches(s)) {
						return ancestor;
					}
					ancestor = ancestor.parentElement;
				} while (ancestor !== null);
				return null;
			};
		}
	}
};
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/** ====================================================================
 * object-assign-polyfill.js
 * -------------------------
 * @description Polfyfill for Object.assign().
 * @credit Thank you MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill).
 * @layer core
===================================================================== */

exports.default = {
	init: function init() {
		if (typeof Object.assign != 'function') {
			// Must be writable: true, enumerable: false, configurable: true
			Object.defineProperty(Object, "assign", {
				// eslint-disable-next-line
				value: function assign(target, varArgs) {
					// .length of function is 2
					'use strict';

					if (target == null) {
						// TypeError if undefined or null
						throw new TypeError('Cannot convert undefined or null to object');
					}

					var to = Object(target);

					for (var index = 1; index < arguments.length; index++) {
						var nextSource = arguments[index];

						if (nextSource != null) {
							// Skip over if undefined or null
							for (var nextKey in nextSource) {
								// Avoid bugs when hasOwnProperty is shadowed
								if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
									to[nextKey] = nextSource[nextKey];
								}
							}
						}
					}
					return to;
				},
				writable: true,
				configurable: true
			});
		}
	}
};
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** ====================================================================
 * flipper-directives.js
 * ---------------------
 * @description Angular directives to be used with flipper-service.js.
 * @layer components
===================================================================== */

(function () {
	/* globals angular */
	angular.module('brikcss.flipper.directives', []).directive('flipper', ['flipperService', flipperDirective]).directive('openFlipper', ['flipperService', openFlipperDirective]).directive('closeFlipper', ['flipperService', closeFlipperDirective]).directive('toggleFlipper', ['flipperService', toggleFlipperDirective]);

	/**
  * Create a flipper directive.
  * @method  flipperDirective
  * @param   {object}  flipperService  Angular dependency.
  * @return  {object}  Angular directive.
  */
	function flipperDirective(flipperService) {
		return {
			restrict: 'A',
			scope: {
				flipper: '=?'
			},
			link: function linkFlipperDirective($scope, $element) {
				// Flipper attribute is the options object and gets passed to flipperService. If it is a string, the value will be passed as the flipper.id.
				if (typeof $scope.flipper === 'string') {
					$scope.flipper = { id: $scope.flipper };
				}

				// Instantiate this flipper instance.
				var flipper = flipperService.create($element[0], $scope.flipper);

				// Destroy flipper when the scope is destroyed.
				$scope.$on('$destroy', function () {
					flipper.destroy();
				});
			}
		};
	}

	/**
  * Directive which adds a click event to open a specific flipper.
  * @method  openFlipperDirective
  * @param   {object}  flipperService  Angular dependency.
  * @return  {object}  Angular directive.
  */
	function openFlipperDirective(flipperService) {
		return {
			restrict: 'A',
			link: function link($scope, $element, $attributes) {
				// Flipper id comes from `open-flipper` attribute.
				var id = $attributes.openFlipper;
				if (id === undefined) {
					return false;
				}

				// Add click event.
				$element[0].addEventListener('click', openFlipper);

				/**
     * Cache openFlipper function so we can easily destroy it.
     * @method  openFlipper
     * @return  {[type]}  [description]
     */
				function openFlipper() {
					flipperService.open(id);
				}

				// On destroy.
				$scope.$on('$destroy', function () {
					$element[0].removeEventListener('click', openFlipper);
				});
			}
		};
	}

	/**
  * Directive which adds a click event to close a specific flipper.
  * @method  closeFlipperDirective
  * @param   {object}  flipperService  Angular dependency.
  * @return  {object}  Angular directive.
  */
	function closeFlipperDirective(flipperService) {
		return {
			restrict: 'A',
			link: function link($scope, $element, $attributes) {
				// Flipper id comes from `close-flipper` attribute.
				var id = $attributes.closeFlipper;
				if (id === undefined) {
					return false;
				}

				// Bind click event.
				$element[0].addEventListener('click', closeFlipper);

				/**
     * Cache the closeFlipper function so we can easily destroy it.
     * @method  closeFlipper
     */
				function closeFlipper() {
					flipperService.close(id);
				}

				// On destroy.
				$scope.$on('$destroy', function () {
					$element[0].removeEventListener('click', closeFlipper);
				});
			}
		};
	}

	/**
  * Directive which adds a click event which toggles a specific flipper.
  * @method  toggleFlipperDirective
  * @param   {object}  flipperService  Angular dependency.
  * @return  {object}  Angular directive.
  */
	function toggleFlipperDirective(flipperService) {
		return {
			restrict: 'A',
			link: function link($scope, $element, $attributes) {
				// Flipper id comes from `toggle-flipper` attribute.
				var id = $attributes.toggleFlipper;
				if (id === undefined) {
					return false;
				}

				// Bind click event.
				$element[0].addEventListener('click', toggleFlipper);

				/**
     * Cache the toggleFlipper function so we can easily destroy it.
     * @method  toggleFlipper
     */
				function toggleFlipper() {
					flipperService.toggle(id);
				}

				// On destroy.
				$scope.$on('$destroy', function () {
					$element[0].removeEventListener('click', toggleFlipper);
				});
			}
		};
	}
})();

/***/ })
/******/ ]);
//# sourceMappingURL=flipper-angularjs.js.map