<<<<<<< HEAD
four51.app.controller('CheckOutViewCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$filter', '$rootScope', '$451', 'Analytics', 'User', 'Order', 'OrderConfig', 'FavoriteOrder', 'AddressList',
function ($rootScope, $scope, $routeParams, $location, $filter, $rootScope, $451, Analytics, User, Order, OrderConfig, FavoriteOrder, AddressList) {
	$scope.errorSection = 'open';
	$scope.shipping = true;

	if($scope.user.Type == "TempCustomer")
	{
		$rootScope.$broadcast('guest');
	    $rootScope.guest = true;
	}
	
=======
four51.app.controller('CheckOutViewCtrl', ['$scope', '$routeParams', '$location', '$filter', '$rootScope', '$451', 'User', 'Order', 'OrderConfig', 'FavoriteOrder', 'AddressList', 'GoogleAnalytics',
function ($scope, $routeParams, $location, $filter, $rootScope, $451, User, Order, OrderConfig, FavoriteOrder, AddressList, GoogleAnalytics) {
	$scope.errorSection = 'open';

>>>>>>> upstream/master
	$scope.isEditforApproval = $routeParams.id != null && $scope.user.Permissions.contains('EditApprovalOrder');
	if ($scope.isEditforApproval) {
		Order.get($routeParams.id, function(order) {
			$scope.currentOrder = order;
		});
	}

	if (!$scope.currentOrder) {
<<<<<<< HEAD
        $location.path('projects');
=======
        $location.path('catalog');
>>>>>>> upstream/master
    }

	$scope.hasOrderConfig = OrderConfig.hasConfig($scope.currentOrder, $scope.user);
	$scope.checkOutSection = $scope.hasOrderConfig ? 'order' : 'shipping';

    function submitOrder() {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
<<<<<<< HEAD
	    $rootScope.$broadcast('guest');
	    $rootScope.guest = true;
        Order.submit($scope.currentOrder,
	        function(data) {
//				if ($scope.user.Company.GoogleAnalyticsCode) {
//					Analytics.trackOrder(data, $scope.user);
//				}
=======
        Order.submit($scope.currentOrder,
	        function(data) {
				if ($scope.user.Company.GoogleAnalyticsCode) {
					GoogleAnalytics.ecommerce(data, $scope.user);
				}
>>>>>>> upstream/master
				$scope.user.CurrentOrderID = null;
				User.save($scope.user, function(data) {
			        $scope.user = data;
	                $scope.displayLoadingIndicator = false;
		        });
		        $scope.currentOrder = null;
		        $location.path('/order/' + data.ID);
	        },
	        function(ex) {
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

	$scope.$watch('currentOrder.CostCenter', function() {
		OrderConfig.address($scope.currentOrder, $scope.user);
	});

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
	    $scope.actionMessage = null;
	    var auto = $scope.currentOrder.autoID;
	    Order.save($scope.currentOrder,
	        function(data) {
		        $scope.currentOrder = data;
		        if (auto) {
			        $scope.currentOrder.autoID = true;
			        $scope.currentOrder.ExternalID = 'auto';
		        }
		        $scope.displayLoadingIndicator = false;
		        if (callback) callback($scope.currentOrder);
	            $scope.actionMessage = "Your changes have been saved";
	        },
	        function(ex) {
		        $scope.currentOrder.ExternalID = null;
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

    $scope.continueShopping = function() {
<<<<<<< HEAD
    	$rootScope.$broadcast('guest');
	    $rootScope.guest = true;
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	    {
	    	
	        saveChanges(function() { $location.path('campaigns') });
	    }
        else
        {
		    $location.path('campaigns');
        }
=======
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	        saveChanges(function() { $location.path('catalog') });
        else
		    $location.path('catalog');
>>>>>>> upstream/master
    };

    $scope.cancelOrder = function() {
	    if (confirm('Are you sure you wish to cancel your order?') == true) {
		    $scope.displayLoadingIndicator = true;
<<<<<<< HEAD
		    $rootScope.$broadcast('guest');
	    	$rootScope.guest = true;
=======
>>>>>>> upstream/master
	        Order.delete($scope.currentOrder,
		        function() {
		            $scope.user.CurrentOrderID = null;
		            $scope.currentOrder = null;
			        User.save($scope.user, function(data) {
				        $scope.user = data;
				        $scope.displayLoadingIndicator = false;
<<<<<<< HEAD
				        $location.path('campaigns');
			        });

=======
				        $location.path('catalog');
			        });
>>>>>>> upstream/master
		        },
		        function(ex) {
			        $scope.actionMessage = ex.Message;
			        $scope.displayLoadingIndicator = false;
		        }
	        );
	    }
    };

    $scope.saveChanges = function() {
        saveChanges();
    };

    $scope.submitOrder = function() {
       submitOrder();
    };

    $scope.saveFavorite = function() {
        FavoriteOrder.save($scope.currentOrder);
    };

	$scope.cancelEdit = function() {
		$location.path('order');
<<<<<<< HEAD
		$rootScope.$broadcast('guest');
	    $rootScope.guest = true;
	};

	$scope.orderToggle = function() {
		$scope.order = !$scope.order;
	};

	$scope.billingToggle = function() {
		$scope.billing = !$scope.billing;
	};

	$scope.shippingToggle = function() {
		$scope.shipping = !$scope.shipping;
	};

	$scope.shippinasbilling = function()
	{
		$scope.shipaddress.IsBilling = true;
		$scope.currentOrder.copyShipAddress = true;
		$rootScope.$broadcast('shipChange');
=======
>>>>>>> upstream/master
	};
}]);