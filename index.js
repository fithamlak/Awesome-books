const dynamicCreation = document.querySelector('.daynamic');
const addButton = document.querySelector('#add');
const titleInput = document.querySelector('#title');
const autherInput = document.querySelector('#author');

// define class with object constructor
function Book(title, author) {
  this.title = title;
  this.author = author;
}
//  data is preserved in the browser's memory by using localStorage.
// check local storage available
// - if available : create local storage object
// - if not: null

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

let availableStorage;

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  availableStorage = window.localStorage;
} else {
  // Too bad, no localStorage for us
  availableStorage = null;
}
// create a single object for the data
const inputDataObject = {};
// function to store data in a loclaStorage
function storeData() {
  inputDataObject.title = titleInput.value;
  inputDataObject.author = autherInput.value;
  const jsonData = JSON.stringify(inputDataObject);
  availableStorage.setItem('InputData', jsonData);
}

// listen to change on input fields
titleInput.addEventListener('change', () => {
  storeData();
});

autherInput.addEventListener('change', () => {
  storeData();
});

// retrive the data by stringify and
// set the object to local on loads of page
function retrieveData() {
  const bookData = availableStorage.getItem('InputData');
  const parseBookData = JSON.parse(bookData);
  if (bookData?.length > 0) {
    const { title, author } = parseBookData;
    titleInput.value = title || '';
    autherInput.value = author || '';
  }
}

window.onload = () => {
  retrieveData();
  bookLoders();
};
