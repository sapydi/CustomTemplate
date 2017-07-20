angular.module('unileverUSApp').factory('networkInformationFactory', function ($rootScope, $cordovaNetwork, backgroundService) {
    return {
        isOnline: function () {
            if (ionic.Platform.isWebView()) {
                return $cordovaNetwork.isOnline();
            }
            else {
                return navigator.onLine;
            }
        },
        isOffline: function () {
            if (ionic.Platform.isWebView()) {
                return !$cordovaNetwork.isOnline();
            }
            else {
                return !navigator.onLine;
            }
        },
        startWatching: function () {
            if (ionic.Platform.isWebView()) {
                $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                    console.log('online: ');
                    backgroundService.start();
                });
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    console.debug('offline: ');
                    backgroundService.stop();
                });
            }
            else {
                window.addEventListener("online", function (e) {
                    console.log('online: ' + connectionType());
                    backgroundService.start();
                }, false);
                window.addEventListener("offline", function (e) {
                    console.debug('offline: ' + connectionType());
                    backgroundService.stop();
                }, false);
            }
        },
        connectionType: function () {
            if (typeof navigator.connection !== 'undefined') {
                var networkState = navigator.connection.type;
                if (typeof Connection !== 'undefined') {
                    var states = {};
                    states[Connection.UNKNOWN] = 'Unknown connection';
                    states[Connection.ETHERNET] = 'Ethernet connection';
                    states[Connection.WIFI] = 'WiFi connection';
                    states[Connection.CELL_2G] = 'Cell 2G connection';
                    states[Connection.CELL_3G] = 'Cell 3G connection';
                    states[Connection.CELL_4G] = 'Cell 4G connection';
                    states[Connection.CELL] = 'Cell generic connection';
                    states[Connection.NONE] = 'No network connection';
                    return states[networkState];
                }
                else {
                    return networkState;
                }
            }
            else {
                return 'No network connection infomation available';
            }
        }
    };
});
