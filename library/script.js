const book = new Book("The asdasd", "asa.J.R.", 25, true);

function Book(title, author, pages, has_read) {
    if(!new.target) {
        throw Error("contructor requires 'new'");
    };
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.has_read = has_read;
    this.info = function() {
        let read_status = has_read ? "has been read" : "not yet read";
        return(`${title} by ${author}, ${pages} pages, ${read_status}`)
    };
};

console.log(book.info());