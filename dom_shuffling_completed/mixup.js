let [, headerNav ] = document.querySelectorAll('header');
let nav = document.querySelector('nav');
let main = document.querySelector('main');
let article = document.querySelector('article');
let h1 = document.querySelector('h1');
let [ figcap1, figcap2 ] = document.querySelectorAll('figcaption');
let [ babyMopImg, chinStickImg ] = document.querySelectorAll('img');

nav.insertAdjacentElement('beforebegin', h1);
main.insertAdjacentElement('beforebegin', headerNav);

figcap1.insertAdjacentElement('beforebegin', chinStickImg);
figcap2.insertAdjacentElement('beforebegin', babyMopImg);
article.appendChild(figcap1.parentElement);
article.appendChild(figcap2.parentElement);
