/** ====================================================================
 * flipper.js
 * ----------
 * @description Flipper plugin.
 * @layer components
===================================================================== */


// eslint-disable-next-line
var flipper = (function () {
	// Service object contains methods and props to be publicly returned.
	var service = {
		create: createFlippers,
		open: openFlipper,
		close: closeFlipper,
		toggle: toggleFlipper,
		destroy: destroyFlipper,
		flippers: {}
	};
	var defaults = {
		type: 'inline', // 'inline'|'modal'
		addClick: false, // Adds open click event to $front element.
		closeButtons: '', // Selector to add close click event to.
		unequalHeight: false, // If you want front/back sides to have unequal height.
		animationTime: 300, // milliseconds.
		innerClass: '', // Class to add to $inner element.
		flipperClass: 'flipper', // Base class for flipper element.
	};
	// Provide CSS classes as a setting so they can be overridden.
	defaults.classes = {
		main: defaults.flipperClass,
		inner: defaults.flipperClass + '__container',
		modals: defaults.flipperClass + '__modals',
		modal: defaults.flipperClass + '__modal',
		front: defaults.flipperClass + '__front',
		back: defaults.flipperClass + '__back',
		mods: {
			flipped: defaults.flipperClass + '--flipped',
			unequal: defaults.flipperClass + '--unequal-height',
			modalsActive: defaults.flipperClass + '__modals--active'
		},
	};
	var nextFlipperId = 0;
	var $flipperModals = document.querySelector(defaults.classes.modals);

	// Init.
	(function init() {
		// Create modals element and insert to the DOM.
		if (!$flipperModals) {
			$flipperModals = document.createElement('div');
		}
		$flipperModals.classList.add('flipper__modals');
		document.body.appendChild($flipperModals);
	})();

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
		// Iterate through elements to create a flipper for each.
		return elements.forEach(function (element, i) {
			// Merge options with defaults and create the flipper instance.
			return createFlipper(element, options);
		});
	}

	/**
	 * Create a flipper instance and cache it.
	 * @method  createFlipper
	 * @param   {HTMLElement}  element  Flipper options object.
	 * @param   {object}  options  Flipper options object.
	 * @return  {object}  Flipper object.
	 */
	function createFlipper(element, options) {
		var flipper;
		// Allow user to pass a function/callback to dynamically create options.
		if (typeof options === 'function') {
			flipper = Object.assign({$element: element}, defaults);
			flipper = Object.assign(flipper, options(flipper));
		} else {
			flipper = Object.assign({$element: element}, defaults, options);
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
		if (service.flippers[flipper.id]) {
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
		service.flippers[flipper.id] = flipper;
		return flipper;
	}

	/**
	 * Build the flipper's inner DOM.
	 * @method  buildFlipperDom
	 * @param   {object}  flipper  Flipper options object.
	 * @return  {object}  Flipper object.
	 */
	function buildFlipperDom(flipper) {
		// Add flipper id to $element.
		flipper.$element.dataset.flipperId = flipper.id;
		// Cache important flipper DOM elements.
		flipper.$front = flipper.$element.children[0];
		flipper.$back = flipper.$element.children[1];
		flipper.$inner = document.createElement('div');
		// Add flipper classes.
		flipper.$element.classList.add(flipper.classes.main);
		flipper.$element.classList.add(flipper.classes.main + '--' + flipper.type);
		flipper.$inner.classList.add(flipper.type === 'modal' ? flipper.classes.modal : flipper.classes.inner);
		flipper.$front.classList.add(flipper.classes.front);
		flipper.$back.classList.add(flipper.classes.back);
		if (flipper.unequalHeight) {
			flipper.$element.classList.add(flipper.classes.mods.unequal);
		}
		if (flipper.innerClass) {
			flipper.$inner.classList.add(flipper.innerClass);
		}
		// Create element's inner dom.
		for (var i = 0; i < flipper.$element.children.length;) {
			flipper.$inner.appendChild(flipper.$element.children[0]);
		}
		flipper.$element.appendChild(flipper.$inner);
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
		flipper.close = function close() {
			closeFlipper(flipper.id);
		};
		flipper.toggle = function toggle() {
			toggleFlipper(flipper.id);
		};
		flipper.destroy = function destroy() {
			destroyFlipper(flipper.id);
		};
		flipper.stopPropagation = function stopPropagate(event) {
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
		// Prevent propagation from flipper modal to document body.
		if (flipper.type === 'modal') {
			flipper.$inner.addEventListener('click', flipper.stopPropagation);
		}
		// Add open click event.
		if (flipper.addClick) {
			flipper.$front.addEventListener('click', flipper.open);
		}
		// Add close click event.
		if (flipper.closeButtons) {
			flipper.$element.querySelectorAll(flipper.closeButtons).forEach(function(button) {
				button.addEventListener('click', flipper.close);
			});
		}
	}

	/**
	 * Flip flipper to open/active state.
	 * @method  openFlipper
	 * @param   {string}  id  Flipper id.
	 */
	function openFlipper(id) {
		var flipper = service.flippers[id];
		// Update flipper state.
		flipper.isOpen = true;
		// Logic for modal flipper.
		if (flipper.type === 'modal') {
			// Close any active flipper modal so only one can be open at a time.
			if (service.activeFlipperModal) {
				service.activeFlipperModal.close();
			}
			// Cache the new active flipper modal.
			service.activeFlipperModal = flipper;
			// Add height/width to main $element to retain its dimensions while $inner is position 'fixed'.
			flipper.$element.style.width = flipper.$element.offsetWidth + 'px';
			flipper.$element.style.height = flipper.$element.offsetHeight + 'px';
			flipper.$element.style.minHeight = flipper.$element.offsetHeight + 'px';
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
			setTimeout(function() {
				$flipperModals.classList.add(defaults.classes.mods.modalsActive);
				flipper.$inner.classList.add(flipper.classes.mods.flipped);
				flipper.$element.classList.add(flipper.classes.mods.flipped);
				// Add click event to body to close flipper while it's open.
				document.addEventListener('click', flipper.close);
			}, 10); // We need a slight delay after appending $inner to $flipperModals to make sure the animation is properly applied.
		// Logic for inline flipper.
		} else if (flipper.type === 'inline') {
			flipper.$element.classList.add(flipper.classes.mods.flipped);
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
		var flipper = service.flippers[id];
		// Update flipper state.
		flipper.isOpen = false;
		// Handle logic for flipper modal.
		if (flipper.type === 'modal') {
			// Deactivate flipper.
			flipper.$inner.classList.remove(flipper.classes.mods.flipped);
			flipper.$element.classList.remove(flipper.classes.mods.flipped);
			service.activeFlipperModal = null;
			// Remove click event to body to close flipper while it's open.
			document.removeEventListener('click', closeFlipper);
			// Wait until animation is complete (plus a 10ms buffer), then reset the state of the flipper.
			setTimeout(function() {
				// Deactivate $flipperModals container.
				$flipperModals.classList.remove(defaults.classes.mods.modalsActive);
				// Append $inner back to $element.
				flipper.$element.appendChild(flipper.$inner);
				// Reset styles.
				flipper.$element.style.width = '';
				flipper.$element.style.height = '';
				flipper.$element.style.minHeight = '';
				flipper.$inner.style.position = '';
				flipper.$inner.style.left = '';
				flipper.$inner.style.top = '';
				flipper.$inner.style.width = '';
				flipper.$inner.style.height = '';
				flipper.$inner.style.minHeight = '';
			}, flipper.animationTime + 10);
		// Handle logic for inline flipper.
		} else if (flipper.type === 'inline') {
			flipper.$element.classList.remove(flipper.classes.mods.flipped);
		}
	}

	/**
	 * Toggle flipper open and close.
	 * @method  toggleFlipper
	 * @param   {string}  id  Flipper id.
	 * @return  {object}  Flipper object.
	 */
	function toggleFlipper(id) {
		var flipper = service.flippers[id];
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
		var flipper = service.flippers[id];
		// Make sure flipper exists.
		if (!flipper) {
			return false;
		}
		// Close flipper if it is active.
		if (flipper.id === service.activeFlipperModal) {
			flipper.close();
		}
		// Remove propagation listener from flipper modal to document body.
		if (flipper.type === 'modal') {
			flipper.$inner.removeEventListener('click', flipper.stopPropagation);
		}
		// Remove open click event.
		if (flipper.addClick) {
			flipper.$front.removeEventListener('click', flipper.open);
		}
		// Remove close click event.
		if (flipper.closeButtons) {
			flipper.$element.querySelectorAll(flipper.closeButtons).forEach(function(button) {
				button.removeEventListener('click', flipper.close);
			});
		}
		// Remove from service cache.
		delete service.flippers[id];
	}

	return service;
})();
