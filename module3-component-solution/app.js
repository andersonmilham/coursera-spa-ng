(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .component('foundItems', foundItemsComponentConfigObj());

    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        const nidCtrl = this;
        nidCtrl.found = [];
        nidCtrl.searchTerm = "";
        nidCtrl.searchedAtLeastOnce = false;
        nidCtrl.lastRemoved = null;

        nidCtrl.search = function () {

            if (!nidCtrl.searchTerm) {
                nidCtrl.searchedAtLeastOnce = true;
                return [];
            }

            MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm)
                .then(function (result) {
                    nidCtrl.found = result;
                    nidCtrl.searchedAtLeastOnce = true;
                });
        };

        nidCtrl.removeItem = function (itemIndex) {
            nidCtrl.lastRemoved = nidCtrl.found.splice(itemIndex, 1)[0];            
        };
    }

    MenuSearchService.$inject = ["$q", "$http"];
    function MenuSearchService($q, $http) {
        const msService = this;

        msService.getMatchedMenuItems = function (searchTerm) {

            return $http(
                {
                    method: "GET",
                    url: "https://davids-restaurant.herokuapp.com/menu_items.json"
                }).then(function (result) {
                    return result.data.menu_items.filter(i => i.description.indexOf(searchTerm) > -1);
                });
        };
    }

    function foundItemsComponentConfigObj() {
        return {
            templateUrl: "foundItems.html",
            // controller: NarrowItDownComponentController,
            bindings: {
                foundItems: "<",
                searchedAtLeastOnce: "<",
                lastRemoved: "<",
                onRemove: "&"
            }
        };

    }

    // function NarrowItDownComponentController() {
    //     //With components you only need to provide
    //     //a function where there is a need to extended
    //     //the behaviors

    //     //Can be any name. It's just a local variable
    //     //but in the component you must use $ctrl
    //     var $ctrl = this;
    // }

} ());