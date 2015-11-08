app.controller('AuthController',  function($auth, $location, $http,$rootScope, $scope) {

    $scope.email='';
    $scope.password='';
    $scope.newUser={};
    $scope.loginError=false;
    $scope.loginErrorText='';

    $scope.login = function() {

        var credentials = {
            email: $scope.email,
            password: $scope.password
        }

        $auth.login(credentials).then(function() {

            return $http.get('index.php/api/v1/authenticate/user');

        }, function(error) {
            $scope.loginError = true;
            $scope.loginErrorText = error.data.error;

        }).then(function(response) {
            console.log(response);
            $rootScope.currentUser = response.data.user;
            $scope.loginError = false;
            $scope.loginErrorText = '';

            $location.path('/books');
        });
    }

    $scope.register = function () {

        $http.post('/index.php/api/v1/register',$scope.newUser)
            .success(function(data){
                $scope.email=$scope.newUser.email;
                $scope.password=$scope.newUser.password;
                $scope.login();
            })

    };

    $scope.init = function() {
        if($auth.isAuthenticated()) $location.path('/books');
    };

    $scope.init();
});
