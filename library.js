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
        book.classList.add('book_card', 't_' + bookTitle.value);
        cardTitle.classList.add('t_' + bookTitle.value);
        cardAuthor.classList.add('t_' + bookTitle.value);
        cardPages.classList.add('t_' + bookTitle.value);
        cardRead.classList.add('t_' + bookTitle.value);
        removeBookBtn.classList.add('remove_button');
        removeBookBtn.setAttribute('id', 't_' + bookTitle.value);
        cardRead.setAttribute('id', "r_" + bookTitle.value);
        cardTitle.innerText = "Title: " + bookTitle.value;
        cardAuthor.innerText = "By: " + bookAuthor.value;
        cardPages.innerText = "Page Count: " + bookPages.value;
        removeBookBtn.innerText = "Remove Book";
        if (bookRead.checked === true) {
            cardRead.innerText = "Read";
            cardRead.classList.add('have_read', 'read_button');
            } else {cardRead.innerText = "Not Read";
            cardRead.classList.add('read_button'); }
        cardSection.appendChild(book);
        book.appendChild(cardTitle);
        book.appendChild(cardAuthor);
        book.appendChild(cardPages);
        book.appendChild(cardRead);
        book.appendChild(removeBookBtn);
}

function toggleRead () {
    const readBtn = document.querySelectorAll('.read_button');
    readBtn.forEach((button) => {
        button.addEventListener('click', () => {
            const bookReadButton = document.getElementById(button.id);
            bookReadButton.classList.toggle('have_read');
            if (bookReadButton.innerText === 'Read') {
            bookReadButton.innerText = 'Not Read';
            } else { bookReadButton.innerText = 'Read'};
            let bookName = getBookTitle(button.id);
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].title === bookName) {
                    if (myLibrary[i].read == true) {
                        myLibrary[i].read = false
                    } else myLibrary[i].read = true;
                }
            }
        })
    })
}

function deleteBook () {
    const removeBook = document.querySelectorAll('.remove_button');
    removeBook.forEach((button) => {
        button.addEventListener('click', () => {
            const deleteItems = document.querySelectorAll('.' + button.id);
            deleteItems.forEach(element => element.remove());
            let bookName = getBookTitle(button.id);
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].title === bookName) {
                    myLibrary.splice(i, 1);
                }
            }
        })
    })
}

function getBookTitle(buttonID) {
    let buttonIDString = buttonID.toString();
    let bookName = buttonIDString.slice(2 , buttonIDString.length);
    return bookName;
}

/* 
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
*/

function submit () {
    addBookToLibrary();
    overrideSubmit(event);
    closeModal();
    clearForm();
    deleteBook();
    toggleRead();

}


