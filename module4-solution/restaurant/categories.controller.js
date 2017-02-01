(function(){
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);
    
    CategoriesController.$inject = ['MenuDataService', 'allCategories'];
    function CategoriesController(MenuDataService, allCategories){
        var categoriesCtrl = this;

        this.allCategories = allCategories.data;
    }

}());