

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create table row element
    const row = document.createElement('tr');
    // Insert columns into table with book data
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    // Add new row with book info to table
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create new div
    const div = document.createElement('div');
    // Add Classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);

    // Timeout after 3 sec--it will remove the alert div
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class

class Store {
  static getBooks() { // will fetch books from lcoal storage
    let books;
    if (localStorage.getItem('books') === null) { // if there is no books create the books array
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books')); // add stored books to book array and turn into JSON object
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks(); // fetch the current books from ls
    books.forEach(function(book){ // go through each book 
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book); 
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book); // add new book to books array
    localStorage.setItem('books', JSON.stringify(books)); // add new books array to local storage after converting to string
  }

  static removeBook(isbn) {
    const books = Store.getBooks(); // fetch the current books from ls
    books.forEach(function(book, index){ // go through each book 
      if (book.isbn === isbn) {
        books.splice(index, 1); // removes item at the index#
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

}

// DOM Load Event -- dislpays book list on page when loaded
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add book Event Listeners
document.getElementById('book-form').addEventListener('submit', 
  function (e) {
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate new book object
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
      // Error Alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add book to list
      ui.addBookToList(book);

      // Add book to local storage
      Store.addBook(book);

      // Show success
      ui.showAlert('Book Added!', 'success')

      // Clear input fields
      ui.clearFields();
    }

    e.preventDefault();
  });

// Event Listener for Delete Book item
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instatiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove book from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
