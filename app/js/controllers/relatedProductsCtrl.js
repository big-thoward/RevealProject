<<<<<<< HEAD
four51.app.controller('RelatedProductsCtrl', ['$rootScope', '$scope', 'Product', '$sce', function($rootScope, $scope, Product, $sce){

	$scope.categoryInteropID = $rootScope.categoryInteropID;
    $scope.subCategoryInteropID = $rootScope.subCategoryInteropID

	if($scope.relatedgroupid)
	{
		Product.search(null, null, $scope.relatedgroupid, function(products) {
			$scope.relatedProducts = products;
			var numrelated = products.length;
		    var liwidth = 100/numrelated;
		   	licss = "width:"+liwidth+"%";
		    $scope.liwidth = licss;
		});

		(function(d, s, id) {
	      var js, fjs = d.getElementsByTagName(s)[0];
	      if (d.getElementById(id)) return;
	      js = d.createElement(s); js.id = id;
	      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
	      fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));

		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
		$scope.trusted = function(d)
		{
			if(d) return $sce.trustAsHtml(d);
		}
	}

	$scope.changeProduct = function(){
		var theurl = document.URL;
		var fixedurl = theurl.replace(/\//g,"%2F");
		$scope.fixedurl = fixedurl;
		$scope.theurl = theurl;
	}
=======
four51.app.controller('RelatedProductsCtrl', ['$scope', 'Product', '$sce', function($scope, Product, $sce){
	if($scope.relatedgroupid){
		Product.search(null, null, $scope.relatedgroupid, function(products) {
			$scope.relatedProducts = products;
		});
		$scope.trusted = function(d){
			if(d) return $sce.trustAsHtml(d);
		}
	}
>>>>>>> upstream/master
}]);