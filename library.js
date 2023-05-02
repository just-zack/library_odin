const body = document.querySelector('body');
const addBook = document.querySelector('#add_book');
const modal = document.querySelector('#modal');
var span = document.querySelector("#close");

addBook.addEventListener('click', openModal);
span.addEventListener('click', closeModal);
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function openModal () {
    modal.style.display = "flex";
}

function closeModal () {
    modal.style.display = "none";
}

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
}
