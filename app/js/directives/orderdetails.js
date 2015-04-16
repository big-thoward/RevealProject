four51.app.directive('orderdetails', function() {
	var obj = {
		restrict: 'AE',
		templateUrl: 'partials/controls/orderDetails.html',
<<<<<<< HEAD
		controller: ['$scope', function($scope) {
=======
		controller: ['$scope', 'Address', function($scope, Address) {
>>>>>>> upstream/master
			if ($scope.isEditforApproval) {
				var exists = false;
				angular.forEach($scope.user.CostCenters, function(cc) {
					if (exists) return;
					exists = cc == $scope.currentOrder.CostCenter;
				});
				if (!exists) {
					$scope.user.CostCenters.push({
						'Name': $scope.currentOrder.CostCenter
					});
				}
			}
<<<<<<< HEAD
=======

            $scope.updateCostCenter = updateCostCenter;

            function updateCostCenter() {
                angular.forEach($scope.user.CostCenters, function(cc) {
                   if (cc.Name == $scope.currentOrder.CostCenter && cc.DefaultAddressID) {
                       Address.get(cc.DefaultAddressID, function(address) {
                            if (address.IsShipping) {
                                $scope.currentOrder.ShipAddressID = cc.DefaultAddressID;
                            }
                       });
                   }
                });
            }
>>>>>>> upstream/master
		}]
	};
	return obj;
});