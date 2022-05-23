// 1. Use an element selector to find all h1 elements.
let $h1Elements = $('h1');
// OR
document.querySelectorAll('h1');


// LS Solution
$('h1');

// 2. Use an ID selector to find the first h1 element.
let $firstH1 = $('#site_title');
// OR
document.querySelector('#site_title');

// LS Solution
$('#site_title');

// 3. Use a descendant selector to find all the list items in the article element.
$('article li');
// OR
document.querySelectorAll('article li');

// LS Solution
$('article li');

// 4. Find the third list item from the article element.
$('article li')[2]
// OR 
document.querySelectorAll('article li')[2];

// Hint
// Check the documentation for the eq() method.

// LS Solution
$('article li').eq(2);

// 5. Find the table element, then find all the odd-numbered table rows in that element.
$('table tr:odd')
// OR
let table = document.querySelector('table');
let tableRows = table.querySelectorAll('tr');
let odds = [...tableRows].filter((_, idx) => idx % 2 !== 0);


// Hint
// Check the documentation for the filter() method.
// The jQuery :odd selector is 0 based.

// LS Solution
$('table').find('tr').filter(':odd');
// or
$('table').find('tr:odd');


// 6. Find the list item that contains the text ac ante, then locate the parent li element.
$("li li:contains('ac ante')").parents('li');

// Hint
// Check the documentation for the :contains() pseudo-selector.

// LS Solution
$('li li').filter(":contains('ac ante')").parents('li');
// or
$("li li:contains('ac ante')").parents('li');

// 7. Find the list item that contains the text ac ante, then find and return the next element.
$("li li:contains('ac ante')").next();

// LS Solution
$("li li:contains('ac ante')").next();

// 8. Find all the table cells in the table, then find the last cell from the collection.
$('table td').last();

// Hint
// Check the documentation for the last() method.
// LS Solution
$('table td').last();
// or
$('table td').eq(-1);

// 9. Find all the table cells that do not have a class of "protected".
$('td').not('.protected');

// Hint
// Check the documentation for the :not() pseudo-selector or the not() method.

// Solution
$('td').not(".protected");
// or
$('td:not(".protected")');

// 10. Find all the anchor elements that have an href value that begins with #.
$("a[href^='#']");

// Hint
// Check the documentation for Attribute Selectors.

// Solution
$('a[href^=#]');

// 11. Find all elements that have a class name that contains "block".
$("[class*='block']");

// Hint
// Check the documentation for Attribute Selectors.

// Solution
$('[class*=block]');