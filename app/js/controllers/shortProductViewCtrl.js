<<<<<<< HEAD
four51.app.controller('shortProductViewCtrl', ['$rootScope', '$routeParams', 'Category', '$scope', 'ProductDisplayService', 'Order', 'User', '$location', '$route', function ($rootScope, $routeParams, Category, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;

=======
four51.app.controller('shortProductViewCtrl', ['$routeParams', '$scope', 'ProductDisplayService', 'Order', 'User', '$location', '$route', function ($routeParams, $scope, ProductDisplayService) {
	$scope.LineItem = {};
	$scope.LineItem.Product = $scope.p;
>>>>>>> upstream/master
	ProductDisplayService.setNewLineItemScope($scope);
	ProductDisplayService.setProductViewScope($scope);
}]);