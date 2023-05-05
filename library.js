const body = document.querySelector("body");
const addBook = document.querySelector("#add_book");
const modal = document.querySelector("#modal");
const cardSection = document.querySelector("#card_section");
let bookTitle = document.getElementById("title");
let bookAuthor = document.getElementById("author");
let bookPages = document.getElementById("pages");
let bookRead = document.getElementById("read");
let submitBook = document.getElementById("submit_book");
let bookReadString = "Read";
var span = document.querySelector("#close");

let myLibrary = [];

addBook.addEventListener("click", openModal);
span.addEventListener("click", closeModal);
submitBook.addEventListener("click", submit);
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function overrideSubmit(event) {
  event.preventDefault();
}

function clearForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function checkIfRead() {
  if (bookRead.checked === false) {
    bookReadString = "Not Read";
  } else bookReadString = "Read";
}

function addBookToLibrary() {
  checkIfRead();
  if (
    bookTitle.value !== "" &&
    bookAuthor.value !== "" &&
    bookPages.value !== ""
  ) {
    myLibrary.push(
      new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.checked
      )
    );
    createBookCard();
  } else {
    alert("You're missing information!");
  }
}

function createBookCard() {
  const book = document.createElement("h3");
  const cardTitle = document.createElement("h2");
  const cardAuthor = document.createElement("h2");
  const cardPages = document.createElement("h2");
  const cardRead = document.createElement("button");
  const removeBookBtn = document.createElement("button");
  let bookTitleNoSpaces = bookTitle.value.split(" ").join("");
  let readID = "r_" + bookTitleNoSpaces;
  let titleID = "t_" + bookTitleNoSpaces;
  book.classList.add("book_card", titleID);
  cardTitle.classList.add(titleID);
  cardAuthor.classList.add(titleID);
  cardPages.classList.add(titleID);
  cardRead.classList.add(titleID);
  removeBookBtn.classList.add("remove_button");
  removeBookBtn.setAttribute("id", titleID);
  cardRead.setAttribute("id", readID);
  cardTitle.innerText = "Title: " + bookTitle.value;
  cardAuthor.innerText = "By: " + bookAuthor.value;
  cardPages.innerText = "Page Count: " + bookPages.value;
  removeBookBtn.innerText = "Remove Book";
  if (bookRead.checked === true) {
    cardRead.innerText = "Read";
    cardRead.classList.add("have_read", "read_button");
  } else {
    cardRead.innerText = "Not Read";
    cardRead.classList.add("read_button");
  }
  cardSection.appendChild(book);
  book.appendChild(cardTitle);
  book.appendChild(cardAuthor);
  book.appendChild(cardPages);
  book.appendChild(cardRead);
  book.appendChild(removeBookBtn);
  toggleRead(readID);
  deleteBook(titleID);
}

function toggleRead(readID) {
  const readBtn = document.getElementById(readID);
  readBtn.addEventListener("click", () => {
    readBtn.classList.toggle("have_read");
    if (readBtn.innerText === "Read") {
      readBtn.innerText = "Not Read";
    } else {
      readBtn.innerText = "Read";
    }
    let bookName = getBookTitle(readID);
    for (let i = 0; i < myLibrary.length; i++) {
      let myLibraryTitle = myLibrary[i].title;
      myLibraryTitle = myLibraryTitle.replace(/\s+/g, "");
      if (myLibraryTitle === bookName) {
        if (myLibrary[i].read == true) {
          myLibrary[i].read = false;
        } else myLibrary[i].read = true;
      }
    }
  });
}

function deleteBook(titleID) {
  const removeBook = document.getElementById(titleID);
  removeBook.addEventListener("click", () => {
    const deleteItems = document.querySelectorAll("." + titleID);
    deleteItems.forEach((element) => element.remove());
    let bookName = getBookTitle(titleID);
    for (let i = 0; i < myLibrary.length; i++) {
      let myLibraryTitle = myLibrary[i].title;
      myLibraryTitle = myLibraryTitle.replace(/\s+/g, "");
      if (myLibraryTitle === bookName) {
        myLibrary.splice(i, 1);
      }
    }
  });
}

function getBookTitle(buttonID) {
  let buttonIDString = buttonID.toString();
  let bookName = buttonIDString.slice(2, buttonIDString.length);
  return bookName;
}

function submit() {
  addBookToLibrary();
  overrideSubmit(event);
  closeModal();
  clearForm();
}

/* Known bug where if you repeat the title, it does some wonky things on button clicks*/
//prettier
