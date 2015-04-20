four51.app.controller('ProductCtrl', ['$rootScope', '$scope', '$routeParams', '$route', '$location', '$451', 'Product', 'ProductDisplayService', 'Order', 'Variant', 'User',
function ($rootScope, $scope, $routeParams, $route, $location, $451, Product, ProductDisplayService, Order, Variant, User) {
    $scope.selected = 1;
    $scope.LineItem = {};
	$scope.addToOrderText = "Add To Cart";
	$scope.loadingIndicator = true;
	$scope.loadingImage = true;
	$scope.searchTerm = null;
	$scope.settings = {
		currentPage: 1,
		pageSize: 10
	};

	var theurl = document.URL;
	var fixedurl = theurl.replace(/\//g,"%2F");
	$scope.fixedurl = fixedurl;
	$scope.theurl = theurl;

	var theurl = document.URL;
	var urlarr = theurl.split("/");
	$rootScope.productInteropID = urlarr[5];

	$scope.calcVariantLineItems = function(i){
		$scope.variantLineItemsOrderTotal = 0;
		angular.forEach($scope.variantLineItems, function(item){
			$scope.variantLineItemsOrderTotal += item.LineTotal || 0;
		})
	};
	function setDefaultQty(lineitem) {
		if (lineitem.PriceSchedule && lineitem.PriceSchedule.DefaultQuantity != 0)
			$scope.LineItem.Quantity = lineitem.PriceSchedule.DefaultQuantity;
	}
	function commaSeparateNumber(val){
	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
	}
	function init(searchTerm, callback) {
		ProductDisplayService.getProductAndVariant($routeParams.productInteropID, $routeParams.variantInteropID, function (data) {
			$scope.LineItem.Product = data.product;
			$scope.LineItem.Variant = data.variant;
			ProductDisplayService.setNewLineItemScope($scope);
			ProductDisplayService.setProductViewScope($scope);
			setDefaultQty($scope.LineItem);
			$scope.$broadcast('ProductGetComplete');
			$scope.loadingIndicator = false;
			$scope.setAddToOrderErrors();
			if (angular.isFunction(callback))
				callback();
   			$scope.goal = commaSeparateNumber(data.product.StaticSpecGroups.Goal.Specs.Goal.Value)
			if(data.product.RelatedProductsGroupID)
			{
				Product.search(null, null, data.product.RelatedProductsGroupID, function(products)
				{
					var sum = 0;
					for (var i = 0; i < products.length; i++)
					{
						var quantity = products[i].QuantityAvailable;
						var goal = products[i].StaticSpecGroups.Goal.Specs.Goal.Value;
						var newsum = goal - quantity;
						sum = sum + newsum;
					}

					sum = commaSeparateNumber(sum);
					$scope.totalSold = sum;
				});
			}
			else
			{
				var sum = 0;
				var quantity = data.product.QuantityAvailable;
				var goal = data.product.StaticSpecGroups.Goal.Specs.Goal.Value;
				sum = goal - quantity;
				sum = commaSeparateNumber(sum);
				$scope.totalSold = sum;
			}

			if(data.product.StaticSpecGroups.Countdown)
			{
				var theyear = parseInt(data.product.StaticSpecGroups.Countdown.Specs.Year.Value,10);
				var themonth = parseInt(data.product.StaticSpecGroups.Countdown.Specs.Month.Value,10);
				var theday = parseInt(data.product.StaticSpecGroups.Countdown.Specs.Day.Value,10);
				themonth = themonth-1;
				var newItem = document.createElement("SPAN");
				var newItem2 = document.createElement("SPAN");
				var newItem3 = document.createElement("SPAN");
				var newItem4 = document.createElement("SPAN");
				var textnode = document.createTextNode(":");
				var textnode2 = document.createTextNode(":");
				var textnode3 = document.createTextNode(":");
				var textnode4 = document.createTextNode(":");
				newItem.appendChild(textnode);
				newItem2.appendChild(textnode2);
				newItem3.appendChild(textnode3);
				newItem4.appendChild(textnode4);
				newItem.className = "deliminator";
				newItem2.className = "deliminator";
				newItem3.className = "deliminator";
				newItem4.className = "deliminator";

				var clock = document.getElementById("clock")
						    , targetDate = new Date(theyear, themonth, theday);

						clock.innerHTML = countdown(targetDate).toHTML();
						setInterval(function()
						{
						 	clock.innerHTML = countdown(targetDate).toHTML();
							if(count > 1)
							{
								countdowntext.insertBefore(newItem, countdowntext.childNodes[1]);
							}

							if(count > 2)
							{
								countdowntext.insertBefore(newItem2, countdowntext.childNodes[3]);
							}

							if(count > 3)
							{
								countdowntext.insertBefore(newItem3, countdowntext.childNodes[5]);
							}

							if(count > 4)
							{
								countdowntext.insertBefore(newItem4, countdowntext.childNodes[7]);
							}
						  }, 1000);
				var countdowntext = document.getElementById("clock");
				var count = countdowntext.childElementCount;
				if(count > 1)
				{
					countdowntext.insertBefore(newItem, countdowntext.childNodes[1]);
				}

				if(count > 2)
				{
					countdowntext.insertBefore(newItem2, countdowntext.childNodes[3]);
				}

				if(count > 3)
				{
					countdowntext.insertBefore(newItem3, countdowntext.childNodes[5]);
				}

				if(count > 4)
				{
					countdowntext.insertBefore(newItem4, countdowntext.childNodes[7]);
				}

			}
			
		}, $scope.settings.currentPage, $scope.settings.pageSize, searchTerm);
	}
	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			init($scope.searchTerm);
	});

	$scope.searchVariants = function(searchTerm) {
		$scope.searchTerm = searchTerm;
		$scope.settings.currentPage == 1 ?
			init(searchTerm) :
			$scope.settings.currentPage = 1;
	};

	$scope.deleteVariant = function(v, redirect) {
		if (!v.IsMpowerVariant) return;
		// doing this because at times the variant is a large amount of data and not necessary to send all that.
		var d = {
			"ProductInteropID": $scope.LineItem.Product.InteropID,
			"InteropID": v.InteropID
		};
		Variant.delete(d,
			function() {
				redirect ? $location.path('/product/' + $scope.LineItem.Product.InteropID) : $route.reload();
			},
			function(ex) {
				$scope.lineItemErrors.push(ex.Message);
				$scope.showAddToCartErrors = true;
			}
		);
	}

	$scope.addToOrder = function(){
		if($scope.lineItemErrors && $scope.lineItemErrors.length){
			$scope.showAddToCartErrors = true;
			return;
		}
		if(!$scope.currentOrder){
			$scope.currentOrder = { };
			$scope.currentOrder.LineItems = [];
		}
		if (!$scope.currentOrder.LineItems)
			$scope.currentOrder.LineItems = [];
		if($scope.allowAddFromVariantList){
			angular.forEach($scope.variantLineItems, function(item){
				if(item.Quantity > 0){
					$scope.currentOrder.LineItems.push(item);
					$scope.currentOrder.Type = item.PriceSchedule.OrderType;
				}
			});
		}else{
			$scope.currentOrder.LineItems.push($scope.LineItem);
			$scope.currentOrder.Type = $scope.LineItem.PriceSchedule.OrderType;
		}
		$scope.addToOrderIndicator = true;
		//$scope.currentOrder.Type = (!$scope.LineItem.Product.IsVariantLevelInventory && $scope.variantLineItems) ? $scope.variantLineItems[$scope.LineItem.Product.Variants[0].InteropID].PriceSchedule.OrderType : $scope.LineItem.PriceSchedule.OrderType;
		// shipper rates are not recalcuated when a line item is added. clearing out the shipper to force new selection, like 1.0
		Order.clearshipping($scope.currentOrder).
			save($scope.currentOrder,
				function(o){
					$scope.user.CurrentOrderID = o.ID;
					User.save($scope.user, function(){
						$scope.addToOrderIndicator = true;
						$location.path('/cart');
					});
				},
				function(ex) {
					$scope.addToOrderIndicator = false;
					$scope.lineItemErrors.push(ex.Detail);
					$scope.showAddToCartErrors = true;
					//$route.reload();
				}
		);
	};

	$scope.setOrderType = function(type) {
		$scope.loadingIndicator = true;
		$scope.currentOrder = { 'Type': type };
		init(null, function() {
			$scope.loadingIndicator = false;
		});
	};

	$scope.$on('event:imageLoaded', function(event, result) {
		$scope.loadingImage = false;
		$scope.$apply();
	});
}]);
