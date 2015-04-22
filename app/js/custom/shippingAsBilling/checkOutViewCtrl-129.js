$scope.shippinasbilling = function()
{
	$scope.shipaddress.IsBilling = true;
	$scope.currentOrder.copyShipAddress = true;
	$rootScope.$broadcast('shipChange');
};