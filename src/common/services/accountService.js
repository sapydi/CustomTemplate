angular.module('unileverUSApp').service('accountService', function($q, $timeout) {

    var self = this;
  	var UNILEVER_US_APP_ACCOUT_KEY = "UnileverUSAppKey";
  	var APP_ACCOUNT_TYPE = 'UnileverUSAppAccountType';
    var SERVICE_NAME = 'UnileverUSAppSDKService'
  	var USERNAME_UNDEFINED = 'UNDEFINED';
  	var PASSWORD_UNDEFINED = 'UNDEFINED';
  	var DOMAIN_UNDEFINED = '';
  	var am;
  	var ss;

  	this.initialize = function(){
  		ss = new cordova.plugins.SecureStorage(function () { $log.debug('Success : SecureStorage initialized.')},
      												   function (error) { $log.debug('SecureStorage Error ' + error); },
      												   UNILEVER_US_APP_ACCOUT_KEY);
  	}


  	/*
  		Gets the account from account manager for android and keyChain for iOS.
  	*/

  	this.getAccountIfExists = function() {
  		var accountInfo = new AccountInformation();
  		var deferred = $q.defer();
  		if (ionic.Platform.isAndroid())
  		{
  			if (window.plugins) {
  				var accountManagerPlugin = window.plugins.accountmanager;
  				if (accountManagerPlugin)
  				{
  					// call getAccountsByType
  					accountManagerPlugin.getAccountsByType(APP_ACCOUNT_TYPE, function(error, accounts) {
  						// Failed.
  						if (error) {
  							deferred.reject('accountmanager error(1): ' + JSON.stringify(error));
  						} else {
  						// Success.
  						try {
                              if(accounts != null && accounts.length == 0){
                                  deferred.resolve(null);
                              }
  								accounts.forEach(function(account) {
  									let user = account.name;
  									accountManagerPlugin.getPassword(account, function(error, password) {
  										if (error) {
  											deferred.reject('accountmanager error(2): ' + JSON.stringify(error));
  										} else {
  											if (password) {
  												accountInfo.setPassword(password);
  											}
  										}
  									});
                                      					accountManagerPlugin.getUserData(account, 'userData', function(error, userdata) {
  										if (error) {
  											deferred.reject('accountmanager error(3): ' + JSON.stringify(error));
  										} else {
  											if (userdata) {
  												accountInfo.setUserData(angular.fromJson(userdata));
  											}
  										}
  									});

  									accountManagerPlugin.getUrl(account, function(error, url) {
  										if (error) {
  											deferred.reject('accountmanager error(2): ' + JSON.stringify(error));
  										} else {
  											if (url) {
  												accountInfo.setUrl(url);
  											}
  										}
  									});

  									accountManagerPlugin.getUserData(account, 'lastLoginAt', function(error, lastLoginAt) {
  										if (error) {
  											deferred.reject('accountmanager error(4): ' + JSON.stringify(error));
  										} else {
  											if (lastLoginAt) lastLoginAt = new Date(lastLoginAt);
  											accountInfo.setLastLoginAt(lastLoginAt);
  										}
  									});
  									deferred.resolve(accountInfo);
  								});
  								//
  							} catch(error) {
  								deferred.reject('accountmanager error(5): ' + JSON.stringify(error));
  							}
  						}
  					});
  				}
  			}
  		}
  		else if (ionic.Platform.isIOS())
  		{

  			/*
  			cordova plugin add https://github.com/crypho/cordova-plugin-secure-storage.git; this is currently used in this project;
  			in future we are targetting for storing details in keychain with fingerprint id.
  			*/

      		ss.get(function (value) {
      			                     if (value != null) {
  										  	value = value.replace(/[\"]/g, '"');
  							              	var accountInformation = JSON.parse(value);
  							              	accountInfo.setUserName(accountInformation.accountInfoData.userData.username);
  							              	accountInfo.setPassword(accountInformation.accountInfoData.password);
  							              	accountInfo.setValidAccount(true);
                                              accountInfo.setUserData(accountInformation.accountInfoData.userData);
  															accountInfo.setUrl(accountInformation.accountInfoData.url);
  							              	deferred.resolve(accountInfo);
  						              }
  						              else {
  						              	deferred.reject(null);
  						              }
      			                 },
      			   function (error) {
      			   					 deferred.reject(null);
      			   					 $log.debug('Error ' + error); },
      			   ENGIE_FS_APP_ACCOUNT_KEY);

  			/*
  				this keychain is obsolete -->$cordovaKeychain plugin https://github.com/shazron/KeychainPlugin
  			*/
  			/*
              the updated keychain plugin https://github.com/driftyco/cordova-plugin-ios-keychain;
              which has issues & not 100% functional
              */
  		}
  		else{
              accountInfo.setValidAccount(false);
              accountInfo.setLastLoginAt(undefined);
              accountInfo.setUserName(USERNAME_UNDEFINED);
              accountInfo.setPassword(PASSWORD_UNDEFINED);
              accountInfo.setDomain(DOMAIN_UNDEFINED);
              deferred.resolve(accountInfo);
  		}
  		return deferred.promise;
  	}


  	this.createAccount = function(userName,password,userData,url) {
          var deferred = $q.defer();
          var accountInformation = new AccountInformation();
          accountInformation.setUserName(userName);
          accountInformation.setPassword(password);
          accountInformation.setUserData(userData);
  				accountInformation.setUrl(url);
          var userCredentials = JSON.stringify(accountInformation);
          if (ionic.Platform.isAndroid())
          {
              if (window.plugins) {
                  var accountManagerPlugin = window.plugins.accountmanager;
                  if (accountManagerPlugin) {
                      try {
                          accountManagerPlugin.addAccountExplicitly(APP_ACCOUNT_TYPE, userName, password, { userData: accountInformation }, function(error, account) {
                                          if (error) {
                                              deferred.reject('accountmanager error(10): ' + JSON.stringify(error));
                                          }
                                      });
                          } catch(error) {
                              deferred.reject('accountmanager error(17): ' + JSON.stringify(error));
                          }
                  }
              }
          }
          else if (ionic.Platform.isIOS())
          {
      			ss.set(function (key) {
      			                       $log.debug('USER CREDENTIALS data inserted successfully into SecureStorage-Keychain.'); },
      			       function (error) {
      			       				   $log.debug('USER CREDENTIALS setup into secure storage failed.' + error); },
                              ENGIE_FS_APP_ACCOUNT_KEY, userCredentials);
          }
      }
  	this.removeAccount = function() {
  		var deferred = $q.defer();
  			ss.remove(
  		    function (key) {
  		    	$log.debug('Removed SecureStorage credentials' + key);
  		    	deferred.resolve(key);
  		    },
  		    function (error) {
  		    	$log.error('Error in SecureStorage, ' + error);
  		    	deferred.reject(error);
  		    },
  		    ENGIE_FS_APP_ACCOUNT_KEY);
  			return deferred.promise;
      }

});
