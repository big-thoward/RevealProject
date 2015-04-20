four51.app.controller('UserEditCtrl', ['$scope', '$location', '$sce', '$injector', 'User',
function ($scope, $location, $sce, $injector, User) {
    var _AnonRouter;
    $scope.existingUser = $scope.user.Type != 'TempCustomer';
    try {
        _AnonRouter = $injector.get('AnonRouter');
    }
    catch(ex){}
	User.get(function(user) {
        $scope.user = user;
        $scope.loginasuser = {};
        $scope.actionMessage = null;
        $scope.securityWarning = false;
        $scope.user.ConfirmEmail = $scope.user.Email;

        $scope.$on('logon', function() {
            $scope.logon = true;
            $scope.create = false;
            $scope.account = false;
        });

        $scope.$on('create', function() {
            $scope.logon = false;
            $scope.create = true;
            $scope.account = false;
        });

        $scope.$on('user', function() {
            $scope.account = true;
            $scope.logon = false;
            $scope.create = false;
        });

        if ($scope.user.Type != 'TempCustomer')
            $scope.user.TempUsername = $scope.user.Username;
        $scope.getToken = function () {
            $scope.loginasuser.SendVerificationCodeByEmail = true;
            $scope.emailResetLoadingIndicator = true;
            User.login($scope.loginasuser, function () {
                    $scope.resetPasswordError = null;
                    $scope.enterResetToken = true;
                    $scope.emailResetLoadingIndicator = false;
                },
                function (err) {
                    $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                    $scope.emailResetLoadingIndicator = false;
                });

        }
        $scope.resetWithToken = function () {
            $scope.emailResetLoadingIndicator = true;
            User.reset($scope.loginasuser, function (user) {
                    delete $scope.loginasuser;
                    $location.path('catalog');
                },
                function (err) {
                    $scope.emailResetLoadingIndicator = false;
                    $scope.resetPasswordError = $sce.trustAsHtml(err.Message);
                });
        }
        $scope.save = function () {
            $scope.actionMessage = null;
            $scope.securityWarning = false;
            $scope.user.Username = $scope.user.TempUsername;
            $scope.displayLoadingIndicator = true;
            if ($scope.user.Type == 'TempCustomer')
                $scope.user.ConvertFromTempUser = true;

            User.save($scope.user,
                function (u) {
                    $scope.securityWarning = false;
                    $scope.displayLoadingIndicator = false;
                    $scope.actionMessage = 'Your changes have been saved';
                    $scope.user.TempUsername = u.Username;
                    if (_AnonRouter && !$scope.existingUser) _AnonRouter.route();
                },
                function (ex) {
                    $scope.displayLoadingIndicator = false;
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.securityWarning = true;
                    else {
                        $scope.actionMessage = $sce.trustAsHtml(ex.Message);
                    }
                }
            );
        };
        $scope.loginExisting = function () {
            User.login({Username: $scope.loginasuser.Username, Password: $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type}, function (u) {
                if (_AnonRouter) _AnonRouter.route();
            }, function (err) {
                $scope.loginAsExistingError = err.Message;
            });
        };

        $scope.accountToggle = function() {
            $scope.account = !$scope.account;
        };

        $scope.logonToggle = function() {
            $scope.logon = !$scope.logon;
        };

        $scope.forgotToggle = function() {
            $scope.forgot = !$scope.forgot;
        };

        $scope.createToggle = function() {
            $scope.create = !$scope.create;
        };
    });
}]);