// Without changing the behavior of the following code, remove the call to event.stopPropagation and refactor the result.

document.querySelector('html').addEventListener('click', () => {
  document.querySelector('#container').style = 'display: none';
});

document.querySelector('#container').addEventListener('click', event => {
  event.stopPropagation();
});

// document.querySelector('html').addEventListener('click', (event) => {
//   if (event.target.id !== 'container') {
//     document.querySelector('#container').style = 'display: none';
//   }
// });
// didn't account for child elements within #container

document.querySelector('html').addEventListener('click', (event) => {
  let container = document.querySelector('#container');
  if (!container.contains(event.target)) {
    document.querySelector('#container').style = 'display: none';
  }
});



// LS Hint:
// When the user clicks anywhere on the page outside the element with an id of container, the code hides the container element. It uses event.stopPropagation to prevent the click from hiding the container element when the user clicks the container itself or a child of the container.

// LS Solution:
/*
document.querySelector('html').addEventListener('click', (event) => {
  const container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});

The refactored code uses the contains method to determine whether the event.target is the container element or one of its children. If event.target isn't part of the container element, the program hides the container.
*/


