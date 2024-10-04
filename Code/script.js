document.addEventListener("DOMContentLoaded", () => {
  const newBookBtn = document.getElementById("newBookBtn");
  const newBookForm = document.getElementById("newBookForm");
  const booksContainer = document.querySelector(".books");

  newBookBtn.addEventListener("click", () => {
    newBookForm.style.display =
      newBookForm.style.display === "none" ? "block" : "none";
  });

  newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    const book = document.createElement("article");
    book.classList.add("book");
    book.innerHTML = `
      <h2>${title}</h2>
      <p>Author: ${author}</p>
      <p>Pages: ${pages}</p>
      <p>Read: ${isRead ? "Yes" : "No"}</p>
      <button class="delete">Delete</button>
    `;

    booksContainer.appendChild(book);
    newBookForm.reset();
    newBookForm.style.display = "none";

    book.querySelector(".delete").addEventListener("click", () => {
      booksContainer.removeChild(book);
    });
  });
});
