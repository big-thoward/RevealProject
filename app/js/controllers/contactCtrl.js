four51.app.controller('ContactCtrl', .'$rootScope', '$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($rootScope, $routeParams, $sce, $scope, $451, Category, Product, Nav) {
	$scope.reveal = function(divid) {
		$scope.answer.faq0 = null;
		$scope.answer.faq1 = null;
		$scope.answer.faq2 = null;
		$scope.answer.faq3 = null;
		$scope.answer.faq4 = null;
		$scope.answer.faq5 = null;
		$scope.answer.faq6 = null;
		$scope.answer.faq7 = null;
		$scope.answer.faq8 = null;
		$scope.answer.faq9 = null;
		$scope.answer.faq0 = null;
		$scope.answer.faq11 = null;
		$scope.answer.faq12 = null;
		$scope.answer.faq13 = null;
		$scope.answer.faq14 = null;
		$scope.answer.faq15 = null;
		$scope.answer.faq16 = null;
		$scope.answer.faq17 = null;
		$scope.answer.faq18 = null;
		$scope.answer.faq19 = null;
		$scope.answer.faq20 = null;
		$scope.answer.faq21 = null;
		var dividint = parseInt(divid,10);
		var divindex = dividint - 1;
		$scope.answer.faqdivindex = true;
    };
});