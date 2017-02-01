(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'restaurant/templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'restaurant/templates/categories.template.html',
                controller: 'CategoriesController as categoriesCtrl',
                resolve: {
                    allCategories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{category}',
                templateUrl: 'restaurant/templates/items.template.html',
                controller: 'ItemsDetailController as itemsDetailCtrl',
                resolve: {
                    category:
                    ['$stateParams',
                        function ($stateParams) {
                            return $stateParams.category;
                        }],
                    items:
                    ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.category);
                        }]
                }
            });

    }

} ());