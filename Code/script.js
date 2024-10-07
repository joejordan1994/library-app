const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLibrary();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  renderLibrary();
}

function renderLibrary() {
  const booksContainer = document.querySelector(".books");
  booksContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
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
      addBookToLibrary(newBook);
      newBookForm.reset();
      newBookForm.style.display = "none";
    }
  });

  document.querySelector(".books").addEventListener("click", (e) => {
    const bookElement = e.target.closest(".book");
    const index = bookElement.getAttribute("data-index");

    if (e.target.classList.contains("delete")) {
      removeBookFromLibrary(index);
    }

    if (e.target.classList.contains("toggleRead")) {
      myLibrary[index].toggleReadStatus();
      renderLibrary();
    }
  });

  // Render the library on page load
  renderLibrary();
});
