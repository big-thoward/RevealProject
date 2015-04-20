four51.app.controller('shortProductViewCtrl', ['$rootScope', '$routeParams', 'Category', '$scope', 'ProductDisplayService', 'Order', 'User', '$location', '$route', function ($rootScope, $routeParams, Category, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
}]);