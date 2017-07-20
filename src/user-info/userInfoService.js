angular.module('unileverUSApp').service('userInfoService', function() { 

	var userName = '';

    this.getUserName = function() {
    	return userName;
    };

    this.setUserName = function(aUserName) {
    	userName = aUserName;
    };
});
