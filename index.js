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
window.onload = () => {
  bookLoders();
};