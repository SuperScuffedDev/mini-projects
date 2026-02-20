const library_display = document.querySelector("#library-display");
const form = document.querySelector("#new-book");
let buttons = document.querySelectorAll("button")

const library = [];

function Book(uuid, title, author, pages, has_read) {
    if(!new.target) {
        throw Error("contructor requires 'new'");
    };
    this.uuid = uuid
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.has_read = has_read;
};

function displayBooks() {
    library_display.innerHTML = '';

    library.forEach((book) => {
        let new_book_div = document.createElement("div");
        new_book_div.style.width = "100%";
        new_book_div.style.height = "10%";
        new_book_div.style.backgroundColor = "rgb(0, 123, 154)";
        new_book_div.style.marginBottom = "4px";
        new_book_div.style.padding = "10px";
        new_book_div.style.display = "flex";
        new_book_div.style.alignItems = "center";
        new_book_div.style.borderRadius = "3px"

        let new_book_description = document.createElement("p");
        new_book_description.style.fontSize = "2cqh";
        new_book_description.style.width = "80%"
        new_book_description.textContent = book.info();

        let new_book_read_swap = document.createElement("button");
        new_book_read_swap.setAttribute("data-uuid", book.uuid);
        new_book_read_swap.setAttribute("data-type", "read-swap");
        new_book_read_swap.style.width = "10%";
        new_book_read_swap.style.height = "50%";
        new_book_read_swap.textContent = "Change Read";

        let new_book_remove = document.createElement("button");
        new_book_remove.setAttribute("data-uuid", book.uuid);
        new_book_remove.setAttribute("data-type", "remove");
        new_book_remove.style.width = "10%";
        new_book_remove.style.height = "50%";
        new_book_remove.textContent = "Delete";

        new_book_div.appendChild(new_book_description);
        new_book_div.appendChild(new_book_read_swap);
        new_book_div.appendChild(new_book_remove);
        library_display.appendChild(new_book_div);

        buttons = document.querySelectorAll("button");

        buttons.forEach(button => {
            addButtonListeners(button);
        });
    });
};


function addBookToLibrary(book_data) {
    const uuid = self.crypto.randomUUID();

    let book = new Book(
        uuid,
        book_data.title,
        book_data.author,
        book_data.pages,
        book_data.has_read
    );

    library.push(book);
    
    displayBooks();
};

function swapReadStatus(uuid) {
    const index = library.findIndex(book => book.uuid === uuid);

    library[index].change_read_status();
    displayBooks();
}

function removeBook(uuid) {
    const index = library.findIndex(book => book.uuid === uuid);

    library.splice(index, 1);
    displayBooks();
}

Book.prototype.info = function() {
    let read_status = this.has_read ? "has been read" : "not yet read";
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${read_status}`)
};

Book.prototype.change_read_status = function() {
    this.has_read = !this.has_read;
    displayBooks();
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const book_data = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        pages: document.getElementById("pages").value,
        has_read: document.getElementById("read").checked
    };
    addBookToLibrary(book_data);
});

const arrowButtonEvent = (event) => {
    if (event.target.getAttribute("data-type") === "read-swap") {
        swapReadStatus(event.target.getAttribute("data-uuid"));
    } else if (event.target.getAttribute("data-type") === "remove") {
        removeBook(event.target.getAttribute("data-uuid"))
    };
}

function addButtonListeners(button) {
    button.removeEventListener("click", arrowButtonEvent)

    button.addEventListener("click", arrowButtonEvent);
}

displayBooks();