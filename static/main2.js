var a = angular.module('sound', ['angularSoundManager'])
a.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

a.controller('soundCtrl', ['$scope', function($scope){


	getter() = function(){
			console.log('hooked');
	};

	$scope.getter() = function(){
			console.log('hooked');
	};

}])
