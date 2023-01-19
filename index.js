const dynamicCreation = document.querySelector('.daynamic');
const addButton = document.querySelector('#add');
const titleInput = document.querySelector('#title');
const autherInput = document.querySelector('#author');

// variables to navigate for each section;
const linForBookList = document.querySelector('.for_list_link');
const linkForAddSection = document.querySelector('.for_addSection_link');
const linkForContInfo = document.querySelector('.for_contact_link');

const dateParagraph = document.querySelector('.date');
const bookListSection = document.querySelector('.book_list');
const addNewSection = document.querySelector('.input_container');
const contactSection = document.querySelector('.contact_info');

// put variables and most used functions first to acces them
let booksData = [];
let availableStorage;
let count = 0;

function storeData(booksData) {
  if (availableStorage) {
    const jsonData = JSON.stringify(booksData);
    availableStorage.setItem('books', jsonData);
  }
}

function retrieveData() {
  const bookData = availableStorage.getItem('books');
  const parseBookData = JSON.parse(bookData);
  if (parseBookData) {
    booksData = parseBookData;
  }
}

// define class with object constructor
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }

  static addBook(book) {
    const newBook = new Book(book.title, book.author);
    booksData.push(newBook);
    storeData(booksData);
    window.location.reload();
  }

  static removeBook(book) {
    booksData = booksData.filter((e) => e.id !== book.id);
    storeData(booksData);
  }
}

// Display all books saved in the collection in the top part of the page.
function bookLoders(bookToBeLoad) {
  const book = document.createElement('article');
  book.classList.add('article_content');
  if (count % 2 === 0) {
    book.style.backgroundColor = '#e5e5e5c4';
  } else {
    book.style.backgroundColor = 'white';
  }
  count += 1;
  const title = document.createElement('p');
  title.innerText = `"${bookToBeLoad.title}" by ${bookToBeLoad.author}`;
  book.append(title);
  const button = document.createElement('button');
  button.classList.add('remove');
  button.innerText = 'Remove';
  button.addEventListener('click', () => {
    Book.removeBook(bookToBeLoad);
    book.style.display = 'none';
  });
  book.append(button);
  dynamicCreation.append(book);
  dynamicCreation.classList.add('dynamic');
}

function displayToPage() {
  booksData.forEach((book) => {
    bookLoders(book);
  });
}

addButton.addEventListener('click', () => {
  const newBook = new Book(titleInput.value, autherInput.value);
  Book.addBook(newBook);
  displayToPage(newBook);
});

function setDateTime() {
  dateParagraph.innerHTML = new Date().toLocaleString();
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

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  availableStorage = window.localStorage;
} else {
  // Too bad, no localStorage for us
  availableStorage = null;
}
// create a single object for the dat

window.onload = () => {
  setDateTime();
  retrieveData();
  displayToPage();
};

// write event handler for each section to display it daynamically

function bookListHandler() {
  bookListSection.style.display = 'flex';
  contactSection.style.display = 'none';
  addNewSection.style.display = 'none';
  linForBookList.style.color = 'blue';
  linkForAddSection.style.color = 'black';
  linkForContInfo.style.color = 'black';
}

function addSectionHandler() {
  bookListSection.style.display = 'none';
  contactSection.style.display = 'none';
  addNewSection.style.display = 'flex';
  linForBookList.style.color = 'black';
  linkForAddSection.style.color = 'blue';
  linkForContInfo.style.color = 'black';
}

function contactInfoHandler() {
  bookListSection.style.display = 'none';
  contactSection.style.display = 'block';
  addNewSection.style.display = 'none';
  linForBookList.style.color = 'black';
  linkForAddSection.style.color = 'black';
  linkForContInfo.style.color = 'blue';
}

linForBookList.addEventListener('click', bookListHandler);
linkForAddSection.addEventListener('click', addSectionHandler);
linkForContInfo.addEventListener('click', contactInfoHandler);