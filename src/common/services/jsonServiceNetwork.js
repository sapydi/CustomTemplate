angular.module('unileverUSApp').service('jsonServiceNetwork', function($http, $httpParamSerializerJQLike, $q, $timeout) {
    // promises-based network connection service modelled after original jsonconnector
    var timeout = 30000;
    var self = this;
    var credentials;

    this.loggedIn = function() {
    	return !!credentials;
    };

    this.setCredentials = function(url, username, password) {
        credentials = { url: url, username: username, password: password };
    }

    this.login = function(url, username, password) { 
        credentials = { url: url, username: username, password: password };

        return loginInternal().catch(function(r) {
            // on fail, clear credentials again
            credentials = undefined;
            return $q.reject(r);
        });
    };

    var loginInternal = function() {
        return logoutInternal().
        then(getRoot).
        then(postCredentials, throwIfNotAlreadyLoggedIn);
    };


    // Execute a method on the specified interface
    this.rpc = function(serviceInterface, method, args) {
        if (!credentials) {
            throw 'not logged in';
        }
        
        var jsonRequest = buildRequest(method, args);

        return execute(serviceInterface, jsonRequest);
    };


    function logoutInternal() {
        return $http.post(credentials.url + '/JSONrpc/PnSessionService', buildRequest('logout'), {timeout: timeout}).
        catch(function() {
            return true;
        });
    }

    this.logout = function() {
        return logoutInternal().then(function(r) {
            credentials = undefined;
        });
    };

    function buildRequest(method, args)
    {
    	var jsonRequest = {
            method: method
        };
        if (args) {
            jsonRequest.args = [];
            if (angular.isArray(args)) {
                var i;
                for (i = 0; i < args.length; i++) {
                    jsonRequest.args[i] = JSON.stringify(args[i]);
                }
            } else {
                jsonRequest.args[0] = JSON.stringify(args);
            }
        }

        return jsonRequest;
    }



    function postCredentials(username, password) {
        var data = {
            j_username: credentials.username,
            j_password: credentials.password
        };
     
        return $http({
            url: credentials.url + '/j_security_check',
            method: 'POST',
            data: $httpParamSerializerJQLike(data),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).
        then(function(r) {
            if (r && r.data && r.data.indexOf('Invalid username or password') >= 0) {
                return $q.reject('Invalid username or password');
            }            
        }, throwIfNotAlreadyLoggedIn);
    }

    function throwIfNotAlreadyLoggedIn(r) {
        if (r && r.data && r.data.indexOf('The requested resource') >= 0) {
            return true;
        }

        return httpErrorHandler(r);
    }

    function getRoot() {
        return $http.get(credentials.url, {timeout: timeout});
    }

    function execute(serviceInterface, jsonRequest) {
    	var executeFunc = function() { return executeImpl(serviceInterface, jsonRequest).then(parseResponse, httpErrorHandler); };

        return executeFunc().
        catch(function(r) {
            if (r === "connection error")
                return $q.reject(r);    // connection error, do not try relogin

            return loginInternal().then(executeFunc);
        });
    }

    function httpErrorHandler(r)
    {
        if (r.status === 0)
            return $q.reject("connection error");
        else
            return $q.reject("http error " + r.status);
    }

    function parseResponse(r) {
        if (r && r.data && r.data.error)
        return $q.reject((r.data.error.message ? r.data.error.message : "rpc error"));

        try {
            return JSON.parse(r.data.result);
        } catch(e) {
            return $q.reject("parse error"); // e.message;
        }
    }

    function executeImpl(serviceInterface, data) {        
        return $http.post(credentials.url + '/JSONrpc/' + serviceInterface, data, {timeout: timeout});
    }
});
