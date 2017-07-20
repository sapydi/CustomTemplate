angular.module('unileverUSApp.controllers').controller('LoginController', LoginController);

function LoginController($scope, $state, $ionicModal, $timeout, $log, userInfoService, backendService /*networkInformationFactory*//*keyboardService*/){
  $scope.loginData = {};
  $scope.domain = 'http://192.168.88.46:18070/sdk';


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
 /* $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    if(($scope.loginData.username == 'supervisor') && ($scope.loginData.password == 'secret')){
      userInfoService.setUserName($scope.loginData.username);
      $state.go('app.observations',null);
    }else{
      console.log('Invalid credentials.');
    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/
  
  $scope.doLogin = function() {
    $scope.result = '';
    console.log('Doing login', $scope.loginData);
    //networkInformationFactory.isOnline() ||
    if (true) {
      $log.debug('ONLINE');
      $log.debug('Login with domain: ' + $scope.domain + ', user: ' + $scope.loginData.username + ', password: ' + $scope.loginData.password);

      backendService.login($scope.domain, $scope.loginData.username, $scope.loginData.password).then(function(result) {
        backendService.getLoggedInPerson().then(function(userData) {
         console.log(userData);
         $state.go('app.observations',null);
        }).catch(function(error) {
          $scope.password = '';
          $log.debug('Error while getting UserData in: ' + JSON.stringify(error));
          $scope.result = 'Error while getting UserData. Error: ' + JSON.stringify(error);
          //navigationService.loading(false);
        })

      }).catch(function(error) {
        $scope.password = '';
        $log.debug('Error while loggin in: ' + JSON.stringify(error));
        $scope.result = 'Error while loggin in: Error: ' + JSON.stringify(error);
        //navigationService.loading(false);
      })
    } else {
      $log.debug('OFFLINE');
      console.log('OFFLINE');
      $state.go('app.observations',null);
    }
  }


};