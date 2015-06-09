if($scope.user.Type == "Customer")
        {
            Address.save(this.address,
                function(address) {
                    $rootScope.$broadcast('event:AddressSaved', address);
                    $location.path($scope.return);
                },
                function(ex) {
                    if (ex.Code.is('ObjectExistsException'))
                        $scope.objectExists = true;
                }
            );
        }
        else
        {
            $scope.user.FirstName = this.address.FirstName;
            $scope.user.LastName = this.address.LastName;
            $scope.user.Email = this.address.Email;
            $scope.user.TempUsername = "test!12345";
            $scope.user.ConfirmPassword = "test!12345";
            $scope.user.Password = "test!12345";
            $scope.user.ConvertFromTempUser = true;
            $rootScope.$broadcast("guest");

            User.save($scope.user,
                function (u) {
                    $scope.securityWarning = false;
                    $scope.displayLoadingIndicator = false;
                },
                function (ex) {
                }
            );
            Address.save(this.address,
                function(address) {
                    $rootScope.$broadcast('event:AddressSaved', address);
                    $location.path($scope.return);
                },
                function(ex) {
                    if (ex.Code.is('ObjectExistsException'))
                        $scope.objectExists = true;
                }
            );
            $rootScope.$broadcast('guest');
        }