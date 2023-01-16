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