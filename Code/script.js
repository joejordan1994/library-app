class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    this.render();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.render();
  }

  render() {
    const booksContainer = document.querySelector(".books");
    booksContainer.innerHTML = "";

    this.books.forEach((book, index) => {
      const bookElement = document.createElement("article");
      bookElement.classList.add("book");
      bookElement.setAttribute("data-index", index);
      bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: <button class="toggleRead">${
          book.isRead ? "Yes" : "No"
        }</button></p>
        <button class="delete">Delete</button>
      `;

      booksContainer.appendChild(bookElement);
    });
  }
}

const myLibrary = new Library();

document.addEventListener("DOMContentLoaded", () => {
  const newBookBtn = document.getElementById("newBookBtn");
  const newBookForm = document.getElementById("newBookForm");

  // Ensure the form is hidden on page load
  newBookForm.style.display = "none";

  newBookBtn.addEventListener("click", () => {
    newBookForm.style.display =
      newBookForm.style.display === "none" ? "block" : "none";
  });

  newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = parseInt(document.getElementById("pages").value, 10);
    const isRead = document.getElementById("isRead").checked;

    if (title && author && pages) {
      const newBook = new Book(title, author, pages, isRead);
      myLibrary.addBook(newBook);
      newBookForm.reset();
      newBookForm.style.display = "none";
    }
  });

  document.querySelector(".books").addEventListener("click", (e) => {
    const bookElement = e.target.closest(".book");
    const index = parseInt(bookElement.getAttribute("data-index"), 10);

    if (e.target.classList.contains("delete")) {
      myLibrary.removeBook(index);
    }

    if (e.target.classList.contains("toggleRead")) {
      myLibrary.books[index].toggleReadStatus();
      myLibrary.render();
    }
  });

  // Render the library on page load
  myLibrary.render();
});
