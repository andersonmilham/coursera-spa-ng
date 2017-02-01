(function () {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'restaurant/templates/items-list.template.html',
            bindings: {
                items: '<',
                category: '<'
            }
        });

})();