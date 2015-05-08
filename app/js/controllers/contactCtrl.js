four51.app.controller('ContactCtrl', ['$rootScope', '$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($rootScope, $routeParams, $sce, $scope, $451, Category, Product, Nav) {
	$scope.collapseanswers = true;
	$scope.reveal = function(divid) {
		$scope.collapseanswers = true;
		$scope.+divid = true;
    };
}]);