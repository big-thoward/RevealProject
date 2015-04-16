four51.app.factory('Security', ['$451', '$cookieStore', function($451, $cookieStore) {
<<<<<<< HEAD
	var _cookieName = 'user.' + $451.apiName;
    return {
        init: function(user, auth) {
            this.currentUser = {
	            SiteID: user.SiteID,
=======
    var _cookieName = 'user.' + $451.apiName;
    var logout = false;
    return {
        init: function(user, auth) {
            this.currentUser = {
                SiteID: user.SiteID,
>>>>>>> upstream/master
                Username: user.Username,
                InteropID: user.InteropID,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Auth: auth
            };
<<<<<<< HEAD
=======
            logout = false;
>>>>>>> upstream/master
            $cookieStore.put(_cookieName, this.currentUser);
        },
        clear: function() {
            $cookieStore.remove(_cookieName);
        },
        auth: function() {
            var user = $cookieStore.get(_cookieName);
            return user ? user.Auth : null;
        },
        isAuthenticated: function() {
<<<<<<< HEAD
            this.currentUser =  $cookieStore.get(_cookieName);
            return !!this.currentUser;
        },
        logout: function() {
            $cookieStore.remove(_cookieName);
=======
            if (!logout) this.currentUser = $cookieStore.get(_cookieName);
            return (!!this.currentUser);
        },
        logout: function() {
            logout = true;
            function delete_cookie( name ) {
                document.cookie = name + '=; path=/' + $451.apiName + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                document.cookie = name + '=; path=/' + $451.apiName + '/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            }
            delete_cookie(_cookieName);
>>>>>>> upstream/master
            delete this.currentUser;
        }
    }
}]);