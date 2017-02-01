(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'restaurant/templates/categories-list.template.html',
            bindings: {
                allCategories: '<'
            }
        });

})();