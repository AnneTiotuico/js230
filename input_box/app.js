let cursorId;
let textfield;

document.addEventListener('DOMContentLoaded', () => {
  textfield = document.querySelector('.text-field');

  textfield.addEventListener('click', event => {
    event.stopPropagation();
    textfield.classList.add('focused');
    cursorId ||= setInterval(() => {
      textfield.classList.toggle('cursor');
    }, 500);
  });
});

document.addEventListener('keydown', event => {
  let content = document.querySelector('.content');
  let key = event.key;
  if (textfield.classList.contains('focused')) {
    if (key.length < 2) content.textContent += key;
    if (key === 'Backspace') content.textContent = content.textContent.slice(0, -1);
  };
});

document.addEventListener('click', event => {
  clearInterval(cursorId);
  let textfield = document.querySelector('.text-field');
  cursorId = null;
  textfield.classList.remove('focused');
  textfield.classList.remove('cursor');
});