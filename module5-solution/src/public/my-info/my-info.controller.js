(function () {
    'use stric';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['user', 'dish', 'ApiPath'];
    function MyInfoController(user, dish, ApiPath) {
        var myInfoCtrl = this;
        myInfoCtrl.basePath = ApiPath;
        myInfoCtrl.user = user;
        myInfoCtrl.dish = dish;
    }

})();