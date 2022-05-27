/*
Let's get some more practice working with the DOM and event listeners. We'll throw in some work with arrays and functions and create a single-page application for creating a grocery list.

When we load the page, we'll be presented with a form that asks us for an item's name and quantity as two text fields. Once the form is completed and submitted, a new item will be added to our grocery list.

Here's a breakdown of the HTML and CSS involved.

Create an HTML file with inputs for the item name, the quantity, and a submit button. You will also need an unordered list for your grocery items; it should be empty to start with.
Create some basic CSS for the page. If you don't want to create the CSS yourself, you can use the starter code from above.
Optional Create a separate print-only stylesheet that hides the form, leaving just the grocery list.
Your JavaScript code should:

Add an event handler for the submit event on the form.
Retrieve the item name and value from the form elements.
Use a quantity of 1 if the quantity field is left empty.
Create a new list item object using the name and quantity as strings.
Add the list item to the grocery list portion of the HTML.
Clear the form's contents.

To reset the form, you can call HTMLFormElement.prototype.reset. You can read about it here.
*/

let groceries = {};
$(function() {
  $('form').submit(function (event) {
    event.preventDefault();
    let item = $('#name').val();
    let qty = $('#quantity').val() || '1';
    if (item && qty) {
      $('ul').append(`<li>${qty} ${item}</li>`);
      groceries[item] = qty;
      this.reset();
    } else {
      alert('Please check your inputs.');
    }
  });
});