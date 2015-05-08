four51.app.controller('ContactCtrl', ['$rootScope', '$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($rootScope, $routeParams, $sce, $scope, $451, Category, Product, Nav) {
	$scope.faq = '0';
	$scope.togglefaq = function(id) {
		$scope.faq = id;
	};
}]);