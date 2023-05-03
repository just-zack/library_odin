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



let myLibrary = [];


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

function checkIfRead () {
    if (bookRead.checked === false) {
        bookReadString = "Not Read"
    } else bookReadString = "Read";
}

function addBookToLibrary() {
    checkIfRead();
    if (bookTitle.value !== "" && bookAuthor.value !== "" && bookPages.value !== "") {
        myLibrary.push(new Book(bookTitle.value,bookAuthor.value,bookPages.value,bookRead.checked));
        createBookCard ();
    } else alert ("You're missing information!");
}

function createBookCard () {
        const book = document.createElement('h3');
        const cardTitle = document.createElement('h2');
        const cardAuthor = document.createElement('h2');
        const cardPages = document.createElement('h2');
        const cardRead = document.createElement('button');
        const removeBookBtn = document.createElement('button');
        book.classList.add('book_card', "book_" + myLibrary.length);
        cardTitle.classList.add("book_" + myLibrary.length);
        cardAuthor.classList.add("book_" + myLibrary.length);
        cardPages.classList.add("book_" + myLibrary.length);
        cardRead.classList.add("book_" + myLibrary.length);
        removeBookBtn.classList.add('remove_button');
        removeBookBtn.setAttribute('id', "book_" + myLibrary.length);
        book.innerText = "Book #" + (myLibrary.length);
        cardTitle.innerText = "Title: " + bookTitle.value;
        cardAuthor.innerText = "By: " + bookAuthor.value;
        cardPages.innerText = "Page Count: " + bookPages.value;
        removeBookBtn.innerText = "Remove Book";
        if (bookRead.checked === true) {
            cardRead.innerText = "Read";
            } else cardRead.innerText = "Not Read";
        if (bookReadString === "Read") {
            cardRead.classList.add('have_read')
        } else cardRead.classList.add('not_read');
        cardSection.appendChild(book);
        book.appendChild(cardTitle);
        book.appendChild(cardAuthor);
        book.appendChild(cardPages);
        book.appendChild(cardRead);
        book.appendChild(removeBookBtn);
}



/* function removeBook () {
    for (let i = 0; i < myLibrary.length; i++) {
        let removeBtn = document.querySelector('.book_' + [i])
        removeBtn.addEventListener('click', () => {
            myLibrary.splice([i]-1,1);
        })
    }
}

//let readButton = document.querySelectorAll('.have_read');
//let notReadButtons = document.querySelectorAll('.not_read');

notReadButtons.forEach((button) => {
    button.addEventListener('click', () => {
        notReadButtons.classList.remove('not_read'); 
    })
});

function changeRead () {
   notReadButtons.classList.add('have_read'); 
}
*/

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
        if (myLibrary[i].read === true) {
            cardRead.innerText = "Read";
            } else cardRead.innerText = "Not Read";   
        if (myLibrary[i].read === true) {
            cardRead.classList.add('have_read')
        } else cardRead.classList.add('not_read');
        cardSection.appendChild(book);
        book.appendChild(cardTitle);
        book.appendChild(cardAuthor);
        book.appendChild(cardPages);
        book.appendChild(cardRead);
    }
}

function submit () {
    addBookToLibrary();
    overrideSubmit(event);
    closeModal();
    clearForm();
    deleteBook();
}
function deleteBook () {
    const removeBook = document.querySelectorAll('.remove_button');
    removeBook.forEach((button) => {
        button.addEventListener('click', () => {
            const deleteItems = document.querySelectorAll('.' + button.id);
            deleteItems.forEach(element => element.remove());
        })
    })
}