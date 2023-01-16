const dynamicCreation = document.querySelector('.daynamic');
const addButton = document.querySelector('#add');
const titleInput = document.querySelector('#title');
const autherInput = document.querySelector('#author');

// Create a collection that keeps a list of books
const listOfBooks = [
  {
    title: 'atomic habit',
    author: 'James Clear',
  },
  {
    title: 'Rich dad poor dad',
    author: 'Robert kiosaki',
  },
  {
    title: 'Think and grow rich',
    author: 'napleon hill',
  },
];

// Create a function to add a new book to the collection, with title and author
function addBook(title, author) {
  const tempBook = {
    title,
    author,
  };
  // save the new added book into the collection
  listOfBooks.push(tempBook);
  // desplay the new added book into the page
  const addedBooks = document.querySelector('#add_books');
  const book = document.createElement('article');
  const titl = document.createElement('p');
  titl.innerText = tempBook.title;
  const authr = document.createElement('p');
  authr.innerText = tempBook.author;
  book.append(titl);
  book.append(authr);
  const button = document.createElement('button');
  button.innerText = 'Remove';
  button.addEventListener('click', () => {
    book.style.display = 'none';
  });
  book.append(button);
  const line = document.createElement('hr');
  book.append(line);
  addedBooks.append(book);
}

// Create a function to remove a book from the collection
function removeBook(index) {
  listOfBooks.splice(listOfBooks.findIndex((e) => e.title === listOfBooks[index].title
  && e.author === listOfBooks[index].author), 1);
  console.log(listOfBooks);
}
// Display all books saved in the collection in the top part of the page.
function bookLoders() {
  for (let k = 0; k < listOfBooks.length; k += 1) {
    const book = document.createElement('article');
    const title = document.createElement('p');
    title.innerText = listOfBooks[k].title;
    const author = document.createElement('p');
    author.innerText = listOfBooks[k].author;
    book.append(title);
    book.append(author);
    const button = document.createElement('button');
    button.innerText = 'Remove';
    button.addEventListener('click', () => {
      removeBook(k);
      book.style.display = 'none';
    });
    book.append(button);
    const line = document.createElement('hr');
    book.append(line);
    dynamicCreation.append(book);
  }
}

// add a new book to the collection and desplay it into the page when add button is clicked
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
