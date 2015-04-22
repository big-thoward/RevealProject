	if($scope.user.Type == "TempCustomer")
	{
		$rootScope.$broadcast('guest');
	    $rootScope.guest = true;
	}