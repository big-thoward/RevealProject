$scope.$on('guest', function() {
    $scope.guest = true;
});

if($scope.guest)
{
    $scope.isAnon = true;
    User.logout();
}
else
{
	$scope.isAnon = $451.isAnon;
}