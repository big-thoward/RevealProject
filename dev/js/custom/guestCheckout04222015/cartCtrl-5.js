$scope.guest = false;

    $scope.$on('guest', function() {
        $scope.guest = true;
    });