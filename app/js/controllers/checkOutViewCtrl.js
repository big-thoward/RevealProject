four51.app.controller('CheckOutViewCtrl', ['$scope', '$routeParams', '$location', '$filter', '$rootScope', '$451', 'User', 'Order', 'OrderConfig', 'FavoriteOrder', 'AddressList', 'GoogleAnalytics',
function ($scope, $routeParams, $location, $filter, $rootScope, $451, User, Order, OrderConfig, FavoriteOrder, AddressList, GoogleAnalytics) {
	$scope.errorSection = 'open';
	$scope.shipping = true;
	$scope.order = true;

    if($scope.user.Type == "TempCustomer")
	{
		$rootScope.$broadcast('guest');
	    $rootScope.guest = true;
	}
	$scope.isEditforApproval = $routeParams.id != null && $scope.user.Permissions.contains('EditApprovalOrder');
	if ($scope.isEditforApproval) {
		Order.get($routeParams.id, function(order) {
			$scope.currentOrder = order;
		});
	}

	if($rootScope.productInteropeID == "RVL014")
	{
		$scope.currentOrder.OrderFields[0].Value = "leebrice";
	}
	else
	{
		$scope.currentOrder.OrderFields[0].Value = "AvrilLavigne";
	}
	

	if (!$scope.currentOrder) {
        $location.path('campaigns/projects/'+$rootScope.productInteropID+'');
    }

	$scope.hasOrderConfig = OrderConfig.hasConfig($scope.currentOrder, $scope.user);
	$scope.checkOutSection = $scope.hasOrderConfig ? 'order' : 'shipping';

    function submitOrder() {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
	    $rootScope.$broadcast('guest');
$rootScope.guest = true;
        Order.submit($scope.currentOrder,
	        function(data) {
				if ($scope.user.Company.GoogleAnalyticsCode) {
					GoogleAnalytics.ecommerce(data, $scope.user);
				}
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
    	$rootScope.$broadcast('guest');
	    $rootScope.guest = true;
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	    {

	        saveChanges(function() { $location.path('campaigns/projects/'+$rootScope.productInteropID+'') });
	    }
        else
        {
		    $location.path('campaigns/projects/'+$rootScope.productInteropID+'');
        }
    };

    $scope.cancelOrder = function() {
	    if (confirm('Are you sure you wish to cancel your order?') == true) {
		    $scope.displayLoadingIndicator = true;
$rootScope.$broadcast('guest');
$rootScope.guest = true;
	        Order.delete($scope.currentOrder,
		        function() {
		            $scope.user.CurrentOrderID = null;
		            $scope.currentOrder = null;
			        User.save($scope.user, function(data) {
				        $scope.user = data;
				        $scope.displayLoadingIndicator = false;
				        $location.path('campaigns/projects/'+$rootScope.productInteropID+'');
			        });
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
	};
}]);