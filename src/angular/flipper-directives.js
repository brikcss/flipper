/** ====================================================================
 * flipper-directives.js
 * ---------------------
 * @description Angular directives to be used with flipper-service.js.
 * @layer components
===================================================================== */


(function () {
	angular.module('brikcss.flipper.directives', [])
		.directive('flipper', ['flipperService', flipperDirective])
		.directive('openFlipper', ['flipperService', openFlipperDirective])
		.directive('closeFlipper', ['flipperService', closeFlipperDirective])
		.directive('toggleFlipper', ['flipperService', toggleFlipperDirective]);

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
					$scope.flipper = {id: $scope.flipper};
				}

				// Instantiate this flipper instance.
				flipperService.create($element[0], $scope.flipper);
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
			link: function ($scope, $element, $attributes) {
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
			link: function ($scope, $element, $attributes) {
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
			link: function ($scope, $element, $attributes) {
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
