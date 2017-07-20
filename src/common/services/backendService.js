angular.module('unileverUSApp').service('backendService', function($http, $q, $timeout, $rootScope, jsonServiceNetwork, jsonServiceLocal/*, navigationService*/) {
    var jsonService = jsonServiceLocal;

    this.loggedIn = function() {
        return jsonService.loggedIn();
    };

    this.logout = function() {
        return execute(jsonService.logout);
    };
    
    this.login = function(url, user, password) {
        console.log("LoginService is called");
        // determine whether to use stubbed backend or not - only in test mode 
        if ($rootScope.testMode)
            jsonService = jsonServiceLocal;
        else
            jsonService = jsonServiceNetwork;

        return execute(function() {return jsonService.login(url, user, password); });
    };

    this.setCredentials = function (url, user, password) {
        jsonService.setCredentials(url, user, password);
    }


    this.getLoggedInPerson = function() {
        return execute(function() { return jsonService.rpc('LoginService', 'getLoggedInPerson', [])});
    }

    this.getAssignedObservations = function(isFullSync) {
        return execute(function() { return jsonService.rpc('UtilisationAppService', 'getAssignedObservations', [isFullSync])});
    }

    this.finishObservation = function(observationListDTO) {
        return execute(function() { return jsonService.rpc('UtilisationAppService', 'finishObservation', [observationListDTO])});
    }

    function execute(call)
    {
        try {
            return call().
            finally(function() {
            });
        } catch(e) {
            throw e;
        }
    }   
});



