/* eslint-disable max-len */
(function groceryListManager() {
  class GroceryList {
    constructor(listContainerElement) {
      this.list = document.querySelector(listContainerElement);
    }

    addItem(name, quantity) {
      var listItem = document.createElement("li");
      listItem.append(`${quantity} ${name}`);

      this.list.append(listItem);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let myGroceryList = new GroceryList("#grocery-list");
    const getValueOf = (selector) => form.querySelector(selector).value;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let name = getValueOf("#name");
      let quantity = getValueOf("#quantity") || "1";

      myGroceryList.addItem(name, quantity);
      form.reset();
    });
  });
})();

/*
Our solution uses two event handlers: a DOMContentLoaded event handler that fires when the DOM is ready and a submit handler that fires when the user submits the form. We also use a GroceryList class to maintain the grocery list. The class stores the list of items in the ul element with the id grocery-list. To isolate our namespace, we wrap all of our code in an IIFE.

The GroceryList class isn't particularly remarkable. The constructor retrieves the element specified by its argument, and the addItem method appends an item name and quantity to the list.

On line 24, we use || to set the default quantity to "1" when an explicit value is not provided by the user.
*/