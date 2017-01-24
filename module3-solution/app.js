(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        const nidCtrl = this;
        nidCtrl.found = [];
        nidCtrl.searchTerm = "";
        nidCtrl.searchedAtLeastOnce = false;

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
            nidCtrl.found.splice(itemIndex, 1);
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

    function FoundItemsDirective() {
        var ddo = {
            restrict: "E",
            templateUrl: "foundItems.html",
            scope: {
                foundItems: "<",
                searchedAtLeastOnce: "<",
                onRemove: "&"
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: "nidCtrl",
            bindToController: true
        };

        return ddo;
    }

    function NarrowItDownDirectiveController() {
        var nidCtrl = this;
    }

} ());