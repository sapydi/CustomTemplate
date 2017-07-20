angular.module('unileverUSApp').service('jsonServiceLocal', function($http, $q, jsonServiceStub) { // overwrite jsonService dependency

    this.getUserInfo = function() {
        return jsonServiceStub.getUserInfo;
    };

    this.getObservations = function() {
    	// $http.get('js/mocks/observations.json').success(function(data) {
     //      console.log(data);
     //      return data;
     //    });
      return jsonServiceStub.getObservations;
    };
});
