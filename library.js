const body = document.querySelector('body');
const addBook = document.querySelector('#add_book');
const modal = document.querySelector('#modal');
const cardSection = document.querySelector('#card_section');
let bookTitle = document.getElementById('title');
let bookAuthor = document.getElementById('author');
let bookPages = document.getElementById('pages');
let bookRead = document.getElementById('read');
let submitBook = document.getElementById('submit_book');
let bookReadString = "Read";
var span = document.querySelector("#close");

let myLibrary = [{title: "How to say hello", author : "john j", pages: 245, read: "Not read"}, {title: "when chocolate", author: "Kristy", pages: 10, read: "Not read"},];


addBook.addEventListener('click', openModal);
span.addEventListener('click', closeModal);
submitBook.addEventListener('click' , submit);
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

function overrideSubmit (event) {
    event.preventDefault();
}

 function clearForm () {
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

function addBookToLibrary() {
    if (bookRead.checked === false) {
        bookReadString = "Not Read"
    };
    if (bookTitle.value !== "" && bookAuthor.value !== "" && bookPages.value !== "") {
        myLibrary.push(new Book(bookTitle.value,bookAuthor.value,bookPages.value,bookReadString));
        createBookCard ();
    } else alert ("You're missing information!");
}

function createBookCard () {
        const book = document.createElement('h3');
        const cardTitle = document.createElement('h2');
        const cardAuthor = document.createElement('h2');
        const cardPages = document.createElement('h2');
        const cardRead = document.createElement('button');
        book.classList.add('book_card');
        book.innerText = "Book #" + (myLibrary.length);
        cardTitle.innerText = "Title: " + bookTitle.value;
        cardAuthor.innerText = "By: " + bookAuthor.value;
        cardPages.innerText = "Page Count: " + bookPages.value;
        cardRead.innerText = bookReadString;
        cardSection.appendChild(book);
        book.appendChild(cardTitle);
        book.appendChild(cardAuthor);
        book.appendChild(cardPages);
        book.appendChild(cardRead);
}

function submit () {
    addBookToLibrary();
    overrideSubmit(event);
    closeModal();
    clearForm();
}

function displayCurrentLibrary () {
    for (let i=0; i < myLibrary.length; i++) {
        const book = document.createElement('h3');
        const cardTitle = document.createElement('h2');
        const cardAuthor = document.createElement('h2');
        const cardPages = document.createElement('h2');
        const cardRead = document.createElement('button');
        book.classList.add('book_card');
        book.innerText = "Book #" + (i+1);
        cardTitle.innerText = "Title: " + myLibrary[i].title;
        cardAuthor.innerText = "By: " + myLibrary[i].author;
        cardPages.innerText = "Page Count: " + myLibrary[i].pages;
        cardRead.innerText = myLibrary[i].read;
        cardSection.appendChild(book);
        book.appendChild(cardTitle);
        book.appendChild(cardAuthor);
        book.appendChild(cardPages);
        book.appendChild(cardRead);

    }
}

displayCurrentLibrary();