(function(){
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsDetailController', ItemsDetailController);

    ItemsDetailController.$inject = ['MenuDataService', 'items', 'category'];
    function ItemsDetailController(MenuDataService, items, category){
        var itemDetailCtrl = this;

        this.category = category;
        this.items = items.data.menu_items;
    }

}());