const dynamicCreation = document.querySelector('.daynamic');
const addButton = document.querySelector('#add');
const titleInput = document.querySelector('#title');
const autherInput = document.querySelector('#author');

// define class with object constructor
function Book(title, author) {
  this.title = title;
  this.author = author;
}

// creat objects
const b1 = new Book('atomic habit', 'James Clear');
const b2 = new Book('Rich dad poor dad', 'Robert kiosaki');
const listOfBooks = [b1, b2];

function addBook(title, author) {
  const newBook = new Book(title, author);
  const book = document.createElement('article');
  book.classList.add('article_content');
  const titleByAuthor = document.createElement('p');
  titleByAuthor.innerText = `${newBook.title} by ${newBook.author}`;
  book.append(titleByAuthor);
  const button = document.createElement('button');
  button.innerText = 'Remove';
  button.classList.add('remove');
  button.addEventListener('click', () => {
    book.style.display = 'none';
  });
  book.append(button);
  const line = document.createElement('hr');
  book.append(line);
  dynamicCreation.append(book);
}

// Create a function to remove a book from the collection
function removeBook(index) {
  listOfBooks.splice(listOfBooks.findIndex((e) => e.title === listOfBooks[index].title
  && e.author === listOfBooks[index].author));
}

// Display all books saved in the collection in the top part of the page.
function bookLoders() {
  for (let k = 0; k < listOfBooks.length; k += 1) {
    const book = document.createElement('article');
    book.classList.add('article_content');
    if (k % 2 === 0) {
      book.style.backgroundColor = '#e5e5e5c4';
    } else {
      book.style.backgroundColor = 'white';
    }
    const title = document.createElement('p');
    title.innerText = `"${listOfBooks[k].title}" by ${listOfBooks[k].author}`;
    book.append(title);
    const button = document.createElement('button');
    button.classList.add('remove');
    button.innerText = 'Remove';
    button.addEventListener('click', () => {
      removeBook(k);
      book.style.display = 'none';
    });
    book.append(button);
    const line = document.createElement('hr');
    book.append(line);
    dynamicCreation.append(book);
    dynamicCreation.classList.add('dynamic');
  }
}

addButton.addEventListener('click', () => {
  addBook(titleInput.value, autherInput.value);
});
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
