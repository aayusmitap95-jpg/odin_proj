// / Storage for all books
const library = [];

// Book Constructor
function Novel(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Prototype function to toggle read status
Novel.prototype.flipRead = function() {
  this.isRead = !this.isRead;
};

// Add book to array
function pushBook(title, author, pages, isRead) {
  const newBook = new Novel(title, author, pages, isRead);
  library.push(newBook);
  refreshDisplay();
}

// Remove book by ID
function removeBook(id) {
  const index = library.findIndex(b => b.id === id);
  library.splice(index, 1);
  refreshDisplay();
}

// Toggle read
function toggleRead(id) {
  const book = library.find(b => b.id === id);
  book.flipRead();
  refreshDisplay();
}

// DOM Display function
function refreshDisplay() {
  const shelf = document.getElementById("bookshelf");
  shelf.innerHTML = "";

  library.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("bookCard");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <div class="cardButtons">
        <button class="toggleBtn">${book.isRead ? "Read" : "Not Read"}</button>
        <button class="removeBtn">Remove</button>
      </div>
    `;

    // Add button actions
    card.querySelector(".toggleBtn").addEventListener("click", () => toggleRead(book.id));
    card.querySelector(".removeBtn").addEventListener("click", () => removeBook(book.id));

    shelf.appendChild(card);
  });
}

// Handle Form
const bookDialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const bookForm = document.getElementById("bookForm");

// Open form
newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

// Form submit
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("readCheck").checked;

  pushBook(title, author, pages, isRead);

  bookForm.reset();
  bookDialog.close();
});

// Add sample books
pushBook("The Hobbit", "J.R.R. Tolkien", 310, true);
pushBook("1984", "George Orwell", 328, false);