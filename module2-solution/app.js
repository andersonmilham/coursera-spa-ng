(function () {
    "use strict"

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getAvailableItems();

        toBuy.buy = ShoppingListCheckOffService.select;
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.items = ShoppingListCheckOffService.getSelectedItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var availableItems = [
            { name: "Cookies", quantity: 10 },
            { name: "Abba-Zabba", quantity: 15 },
            { name: "Airheads", quantity: 20 },
            { name: "Andes Mint", quantity: 30 },
            { name: "Blackjack Gum", quantity: 100 }
        ];
        var selectedItems = [];

        service.select = function(index){
            var boughtItem = availableItems.splice(index, 1);
            selectedItems.push(boughtItem[0]);
        }

        service.getAvailableItems = function () {
            return availableItems;
        };

        service.getSelectedItems = function () {
            return selectedItems;
        };


    }

})();