four51.app.controller('RelatedProductsCtrl', ['$rootScope', '$scope', 'Product', '$sce', function($rootScope, $scope, Product, $sce){

	$scope.categoryInteropID = $rootScope.categoryInteropID;
    $scope.subCategoryInteropID = $rootScope.subCategoryInteropID

	if($scope.relatedgroupid)
	{
		Product.search(null, null, $scope.relatedgroupid, function(products) {
			$scope.relatedProducts = products;
			var numrelated = products.length;
		    var liwidth = 100/numrelated;
		   	var licss = "width:"+liwidth+"%";
		   	if(licss){ $scope.liwidth = licss;}
		   
		});
	}

	$scope.changeProduct = function(){
		var theurl = document.URL;
		var fixedurl = theurl.replace(/\//g,"%2F");
		$scope.fixedurl = fixedurl;
		$scope.theurl = theurl;
	}
}]);