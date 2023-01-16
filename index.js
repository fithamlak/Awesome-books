const dynamicCreation = document.querySelector('.daynamic');

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
  listOfBooks.push(tempBook);
}

// Create a function to remove a book from the collection
function removeBook(index) {
  listOfBooks.splice(listOfBooks.findIndex((e) => e.title === listOfBooks[index].title
  && e.author === listOfBooks[index].author), 1);
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
    book.append(button);
    const line = document.createElement('hr');
    book.append(line);
    dynamicCreation.append(book);
  }
}
window.onload = () => {
  bookLoders();
};