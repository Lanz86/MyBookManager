/**
 * Created by Antonio on 08/11/2015.
 */
app.controller('MainCtrl',  function($http, $rootScope, $scope, $location, $routeParams, $auth) {
    $scope.userName = $rootScope.currentUser;
    $scope.showLogin = !$auth.isAuthenticated();
    $scope.showLogout = $auth.isAuthenticated();

    $scope.logout = function() {
        $auth.logout().then(function() {
            localStorage.removeItem('user');
            $rootScope.currentUser = null;
            $location.path('/login');
        });
    };

});