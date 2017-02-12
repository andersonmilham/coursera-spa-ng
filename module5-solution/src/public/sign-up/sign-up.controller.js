(function () {
    'use stric';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['SignUpService', '$q'];
    function SignUpController(SignUpService, $q) {
        var signUpCtrl = this;
        signUpCtrl.errorMessage = "";

        signUpCtrl.user = {};

        signUpCtrl.userSaved = {};

        signUpCtrl.submit = function () {
            var deferred = $q.defer();

            SignUpService.subscribe(signUpCtrl.user)
                .then(function () {
                    signUpCtrl.errorMessage = "";
                    deferred.resolve();
                }).catch(function (err) {
                    signUpCtrl.errorMessage = "No such menu number exists";
                    deferred.reject();
                });

            return deferred.promisse;
        };

        signUpCtrl.isSubscribed = function(){
            return !!SignUpService.getUser();
        }
    }

})();