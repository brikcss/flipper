/** ====================================================================
 * flipper-service.js
 * ------------------
 * @description Flipper plugin for Angular. This can be used in
 * 	tandem with the flipper angular directives.
 * @layer components
===================================================================== */


import service from 'src/js/vanilla/flipper';


/**
 * Flipper service / plugin.
 */
/* globals angular:false */
(function() {
	angular.module('brikcss.flipper.service', [])
		.factory('flipperService', function () {
			return service;
		});
})();
