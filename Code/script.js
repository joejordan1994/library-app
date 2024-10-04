const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const libraryDisplay = document.getElementById("library"); // Assume you have this section in HTML
  libraryDisplay.innerHTML = ""; // Clear previous books
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <p>${book.isRead ? "Read" : "Not Read"}</p>
        <button onclick="toggleReadStatus(${index})">Toggle Read</button>
        <button onclick="removeBook(${index})">Remove Book</button>
      `;
    libraryDisplay.appendChild(bookCard);
  });
}

document.getElementById("newBookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);
  displayBooks();
});

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
}

// Display books when the page loads
displayBooks();