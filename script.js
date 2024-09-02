function Books(title, author, pages, read, description) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.description = description;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

Books.prototype.changeReadStatus = function () {
    if (this.read === "yes")
        return this.read = "no"
    else return this.read = "yes"
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read, description) {
    const bookTitle = new Books(title, author, pages, read, description);
    myLibrary.push(bookTitle);
}

// BOOKS EXAMPLES ON PAGE LOAD
addBookToLibrary("There Are Rivers in the Sky: A novel", "J.D MORGAN", 455, "yes", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae. Lorem Ipsum del repundia alkapone susca lia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae. Lorem Ipsum del repundia alkapone susca lia.");
addBookToLibrary("book2", "author2", 11, "yes");
addBookToLibrary("book3", "author3", 9, "no", "WHAT A NICE BOOK EXAMPLE!");


function updateLibrary() {

    const container = document.querySelector(".cards-container");
    container.replaceChildren();

    // Initialize this variable to get an id
    // Which is needed to remove a book from the library
    let bookId = 0;

    myLibrary.forEach(element => {

        // setAttributes for renderIcon function
        // to get the SVGs on the card footer
        const removeIconAttribute = `M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z`;
        const editStatusIcon = `M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z`;
        const removeIconTitle = "Remove this book from the library";
        const editIconTitle = "Edit read status";

        const card = document.createElement("div");
        const hr = document.createElement("hr");
        const title = document.createElement("h3");
        const author = document.createElement("p");
        const description = document.createElement("p");
        const pagesNumber = document.createElement("p");
        const read = document.createElement("footer");
        const div = document.createElement("div");

        card.className = "card";
        description.className = "description";
        author.className = "author";
        pagesNumber.className = "pages-number";

        card.setAttribute("data-book-number", bookId);

        title.textContent = element.title;
        author.textContent = element.author;
        description.textContent = element.description;
        pagesNumber.textContent = element.pages + " pages";

        // Change the text & color of the card footer's text
        // Useful for editing the read status
        function readText() {
            if (element.read === "yes"){
                div.textContent = "read ✔️";
                div.style.color = "green";
            }
            else {
                div.textContent = "unread ❌"
                div.style.color = "red";
        }};
        // And run it!
        readText();

        container.appendChild(card);
        read.append(renderIcon(removeIconAttribute, removeIconTitle), div, renderIcon(editStatusIcon, editIconTitle));
        card.append(title, author, hr, description, pagesNumber, read);

        read.firstChild.addEventListener("click", () => {
            card.remove();
            myLibrary.splice(card.attributes["data-book-number"].value, 1);
            updateLibrary();
        })
        read.lastChild.addEventListener("click", () => {
            console.log(card.attributes["data-book-number"].value);
            myLibrary[card.attributes["data-book-number"].value].changeReadStatus();
            readText();
        })

        bookId++;
    })
};

// DIALOG BOX - ADD A BOOK IN THE FRAME
const addBook = document.querySelector("dialog");
const titleInput = addBook.querySelector("input[name='title']");
const authorInput= addBook.querySelector("input[name='author']");
const descriptionInput = addBook.querySelector("textarea");
const pagesInput = addBook.querySelector("input[name='pages']");
const readInput = addBook.querySelector("input[name='read']");
const addInputs = addBook.querySelector("#confirm-btn");
const cancelFormButton = addBook.querySelector("button[value='cancel']")
const addBookButton = document.querySelector("#add-book");

addBookButton.addEventListener("click", () => {
    addBook.showModal();
});

cancelFormButton.addEventListener("click", () => {
    addBook.close();
});

addInputs.addEventListener("click", (event) => {
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value, descriptionInput.value)
    updateLibrary();
    event.preventDefault();
    addBook.querySelector("form").reset();
    addBook.close();
});

// Run this function on page load to get the books examples
updateLibrary();

// Render SVG icons
// THANKS TO THIS POST
// https://blog.q-bit.me/how-to-create-svg-elements-with-javascript/
function renderIcon(attr, title) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    
    const iconTitle = document.createElement("title");
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    // iconSvg.setAttribute('class', 'rm');


    iconPath.setAttribute("d", attr);
    iconTitle.textContent = title;
    

    iconSvg.append(iconTitle, iconPath);

    return iconSvg;
};