four51.app.controller('AddressInputCtrl', ['$scope', '$rootScope', '$location', 'User', 'Address', 'Resources',
    function($scope, $rootScope, $location, User, Address, Resources) {
        $scope.guest = true;
        $scope.address.AddressName = "Address1";
        $scope.save = function() {
            $scope.objectExists = false;
            if ($scope.user.Type == "Customer") {
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
            } else {
                $scope.user.FirstName = this.address.FirstName;
                $scope.user.LastName = this.address.LastName;
                $scope.user.Email = this.address.Email;
                $scope.user.TempUsername = "test!12345";
                $scope.user.ConfirmPassword = "test!12345";
                $scope.user.Password = "test!12345";
                $scope.user.ConvertFromTempUser = true;
                $rootScope.$broadcast("guest");
                User.save($scope.user,
                    function(u) {
                        $scope.securityWarning = false;
                        $scope.displayLoadingIndicator = false;
                    },
                    function(ex) {}
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
        };
        $scope.delete = function() {
            Address.delete(this.address, function() {
                $location.path($scope.return);
            });
        };

        $scope.streetAdded = function() {
            $scope.address.AddressName = $scope.address.Street1;
        }

        $scope.cancel = function() {
            $scope.return ? $location.path($scope.return) : $rootScope.$broadcast('event:AddressCancel');
        };

        $scope.countries = Resources.countries;
        $scope.states = Resources.states;

        $scope.country = function(item) {
            return $scope.address != null ? $scope.address.Country == item.country : false;
        };
        $scope.hasStates = function() {
            return $scope.address != null ? $scope.address.Country == 'US' || $scope.address.Country == 'CA' || $scope.address.Country == 'NL' : false;
        };

        $scope.isPhoneRequired = function() {
            return ($scope.user.Permissions.contains('BillingAddressPhoneRequired') && $scope.address.IsBilling) || ($scope.user.Permissions.contains('ShipAddressPhoneRequired') && $scope.address.IsShipping) || ($scope.user.Permissions.contains('BillingAddressPhoneRequired') && $scope.user.Permissions.contains('ShipAddressPhoneRequired'));
        };

        var streetComplete = null;
        var streetNum = null;
        var streetName = null;
        var tempShipping = null;
        var tempBilling = null;

        $scope.$watch('addressobj', function(newval, oldval) {
            if (newval != oldval) {
                $scope.address.IsShipping ? (tempShipping = true) : '';
                $scope.address.IsBilling ? (tempBilling = true) : '';
                $scope.address = {
                    'Country': "US"
                };
                tempShipping ? $scope.address.IsShipping = tempShipping : '';
                tempBilling ? $scope.address.IsBilling = tempBilling : '';
                streetComplete = null;
                streetNum = null;
                streetName = null;
                $scope.makeAddress(newval);
            }
        }, true);

        $scope.makeAddress = function(addressobj) {
            $scope.address.AddressName = addressobj.name;
            addressobj.formatted_phone_number ? $scope.address.Phone = addressobj.formatted_phone_number : '';
            angular.forEach(addressobj.address_components, function(component) {
                component.types[0] == 'street_number' ? (streetNum = component.long_name) : null;
                component.types[0] == 'route' ? (streetName = component.long_name) : null;
                if (streetNum || streetName) {
                    if (streetNum && streetName) {
                        streetComplete = streetNum + ' ' + streetName;
                    } else if (streetNum) {
                        streetComplete = streetNum;
                    } else {
                        streetComplete = streetName;
                    }
                    $scope.address.Street1 = streetComplete;
                }
                component.types[0] == 'locality' ? ($scope.address.City = component.long_name) : '';
                component.types[0] == 'administrative_area_level_1' ? ($scope.address.State = component.short_name) : '';
                component.types[0] == 'country' ? ($scope.address.Country = component.short_name) : '';
                component.types[0] == 'postal_code' ? ($scope.address.Zip = component.short_name) : '';
            });
        }
    }
]);
