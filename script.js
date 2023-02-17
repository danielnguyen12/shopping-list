const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  checkState();
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);

  checkState();

  itemInput.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onClickItem(e) {
  if (e.target.parentNode.classList.contains('remove-item')) {
    removeItem(e.target.parentNode.parentNode);
  }
}

function removeItem(item) {
  item.remove();
  removeItemFromStorage(item.textContent);
  checkState();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage(item);

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
  itemList.innerHTML = '';

  localStorage.removeItem('items');

  checkState();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function checkState() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  displayItems();

  checkState();
}

init();