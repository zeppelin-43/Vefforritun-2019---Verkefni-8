const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka

    // for (let item in items)
    // Byrja á því að sækja öll element af hverri tegund og ítra síðan í gegnum þau öll
    const buttons = document.querySelectorAll('.item__button'); 
    for (let b of buttons)
      b.addEventListener('click', deleteItem);
    const checkboxes = document.querySelectorAll('.item__checkbox');
    for (let c of checkboxes)
      c.addEventListener('click', finish);
    const spans = document.querySelectorAll('.item__text');
    for (let s of spans)
      s.addEventListener('click', edit);
  }

  function formHandler(e) {
    e.preventDefault();

    const newTask = e.target.querySelector('.form__input');

    var description = newTask.value;
    var trimmedDescription = description.trim(); // Fjarlægir öll bil vinstra og hægra megin við textann
    if(trimmedDescription !== '')
      add(trimmedDescription);

    newTask.value = '';
    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const span = e.target;
    const text = span.innerText;

    const newInput = el('input', 'item__text');
    newInput.setAttribute('type', 'text');
    newInput.value =text;
    newInput.addEventListener('keyup', commit);

    parent = span.parentNode;
    parent.removeChild(span);
    parent.insertBefore(newInput, parent.querySelector('.item__button'));
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    // Ýta á ENTER til að staðfesta breytingar, annars gerist ekki neitt
    if(e.keyCode === ENTER_KEYCODE)
    {
      const input = e.target;
      const text = input.value;
  
      const newSpan = el('span', 'item__text', edit);
      newSpan.innerText = text;
  
      parent = input.parentNode;
  
      parent.removeChild(input);
      parent.insertBefore(newSpan, parent.querySelector('.item__button'));
    } 
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const newItem = el('li', 'item');

    const newCheckBox = el('input', 'item__checkbox', finish);
    const newSpan = el('span', 'item__text', edit);
    const newButton = el('button', 'item__button', deleteItem);
    
    newCheckBox.setAttribute('type', 'checkbox');
    newSpan.innerText = value;
    newButton.innerHTML = 'Eyða';

    newItem.appendChild(newCheckBox);
    newItem.appendChild(newSpan);
    newItem.appendChild(newButton);

    items.appendChild(newItem);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
      const listItem = e.target.parentNode;
    console.log('Delete');
      items.removeChild(listItem);

  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    if(clickHandler === null)
      return newElement;
    newElement.addEventListener('click', clickHandler);
    return newElement;
  }

  return {
    init: init
  }
})();
