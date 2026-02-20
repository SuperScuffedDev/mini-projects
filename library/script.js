const library_display = document.querySelector("#library-display");

// const library = [
//     {
//         id: "36b8f84d-df4e-4d49-b662-bcde71a8764f",
//         title: "Cannery Row",
//         author: "John Steinbeck",
//         pages: 224,
//         has_read: false,
//     },
//     {
//         id: "eafaa717-5b50-4b3d-866c-bd1956ec8a90",
//         title: "Night Film",
//         author: "Marisha Pessl",
//         pages: 640,
//         has_read: true,
//     },
// ];

const library = [];

function Book(id, title, author, pages, has_read) {
    if(!new.target) {
        throw Error("contructor requires 'new'");
    };
    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.has_read = has_read;
};

function displayBooks() {
    library.forEach((book) => {
        let new_book_div = document.createElement("div");
        new_book_div.style.width = "100%";
        new_book_div.style.height = "10%";
        new_book_div.style.backgroundColor = "rgb(0, 123, 154)";
        new_book_div.style.marginBottom = "4px";
        new_book_div.style.padding = "10px";
        new_book_div.style.display = "flex";
        new_book_div.style.alignItems = "center";

        let new_book_description = document.createElement("p");
        new_book_description.style.fontSize = "2cqh";

        let read_status = book.has_read ? "has been read" : "not yet read";
        new_book_description.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${read_status}`;

        new_book_div.appendChild(new_book_description);
        library_display.appendChild(new_book_div);
        console.log("book")
    });
};

function addBookToLibrary() {
    const uuid = self.crypto.randomUUID();
};

Book.prototype.info = function() {
    let read_status = has_read ? "has been read" : "not yet read";
    return(`${title} by ${author}, ${pages} pages, ${read_status}`)
};

displayBooks();