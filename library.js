const body = document.querySelector('body');
const addBook = document.querySelector('#add_book');
const modal = document.querySelector('#modal');
const cardSection = document.querySelector('#card_section');
let bookTitle = document.getElementById('title');
let bookAuthor = document.getElementById('author');
let bookPages = document.getElementById('pages');
let submitBook = document.getElementById('submit_book');
var span = document.querySelector("#close");

addBook.addEventListener('click', openModal);
span.addEventListener('click', closeModal);
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
submitBook.addEventListener('click' , submit);

function openModal () {
    modal.style.display = "flex";
}

function closeModal () {
    modal.style.display = "none";
}

function submit () {
    addBookToLibrary();
    overrideSubmit(event);
    closeModal();
    clearForm();
}

function overrideSubmit (event) {
    event.preventDefault();
}

 function clearForm () {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
 }

let myLibrary = [{title: "How to say hello", author : "john j", pages: 245, read: "not read"}, {title: "when chocolate", author: "Kristy", pages: 10, read: "not read"},];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    myLibrary.push(new Book(bookTitle.value,bookAuthor.value,bookPages.value, 'not read'));
}

console.log(myLibrary)
/*function displayBooks () {
    for (let i=0; i < myLibrary.length; i++) {
        const book[i] = document.createElement('div');

    }
}
*/