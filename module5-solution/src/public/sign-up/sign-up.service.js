(function () {
    'use strict';

    angular.module('public')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['MenuService', '$q'];
    function SignUpService(MenuService, $q) {
        var signUpSrv = this;
        signUpSrv.user = null;
        signUpSrv.dish = null;

        signUpSrv.subscribe = function (user) {
            return MenuService.getMenuItem(user.dish)
                .then(function (data) {
                    signUpSrv.dish = data;
                    signUpSrv.user = user;
                });
        };

        signUpSrv.getUser = function () {
            return signUpSrv.user;
        };

        signUpSrv.getDish = function () {
            return signUpSrv.dish;
        };
    }

})();