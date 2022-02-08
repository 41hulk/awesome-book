/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const container = document.querySelector('.book-container');

class UI {
  static myBooks = [];

  static addBook(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('single-book');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const text = document.createElement('h2');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('delete');
    h2.textContent = book.title;
    h3.textContent = book.author;
    text.textContent = 'by';
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('id', book.id);
    bookDiv.appendChild(h2);
    bookDiv.appendChild(text);
    bookDiv.appendChild(h3);
    bookDiv.appendChild(removeBtn);
    container.appendChild(bookDiv);

    const bookJson = JSON.stringify(UI.myBooks);
    localStorage.setItem('books', bookJson);
  }

  static deleteBook(bookId) {
    const myBooks = UI.myBooks.filter((book) => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(myBooks));
  }

  static displayBooks() {
    if (localStorage.getItem('books') === null) {
      UI.myBooks = [];
    } else {
      UI.myBooks = JSON.parse(localStorage.getItem('books'));
    }
    UI.myBooks.forEach((element) => {
      UI.addBook(element);
    });
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event Listener for Add a Book

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);
  // Instantiate Book
  const book = new Book(title, author, id);

  // Display Book in UI
  UI.myBooks = UI.myBooks.concat(book);
  UI.addBook(book);

  // Clear Fields
  UI.clearFields();
});

window.addEventListener('load', UI.displayBooks());

// Event Listener for delete a book

container.addEventListener('click', (e) => {
  const ui = new UI();
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
    ui.deleteBook(e.target.id);
  }
});

window.addEventListener('DOMContentLoaded', UI.displayBooks());
