/**
 * Represents a individual book that can be purchased
 */
class Book {
    /**
     * The 13 digit ISBN number
     */
    isbn : string;

    /**
     * The title of the book
     */
    title : string;

    /**
     * The retail price of the book
     */
    price : number;

    /**
     * The date the book was first published
     */
    releaseDate : Date;
}

window.onload = function() {
    // Set up button click for add book form
    let addBookBtn = document.querySelector("#add-book") as HTMLButtonElement;
    addBookBtn.onclick = processBook;
}

function processBook() {
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
    /**
     * This function will retrieve all the book
     * data from the HTML page. If all data is valid
     * a Book object will be returned. If any data
     * is invalid, null will be returned
     */
function getBook():Book {
    clearAllErrorMessages();

    // Get all inputs
    let isbnTextBox = document.querySelector('#isbn') as HTMLInputElement;
    let titleTextBox = document.querySelector('#title') as HTMLInputElement;
    let priceTextBox = document.querySelector('#price') as HTMLInputElement;
    let releaseDateTextBox = document.querySelector('#release-date') as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    // Validate ISBN
    let isbn:string = isbnTextBox.value;
    if (!isValidIsbn(isbn)) {
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";
    }

    // Validate title
    let title:string = titleTextBox.value;
    if (title.trim() == "") {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must provide a title"
    }

    // Validate price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number"
    }

    // Validate release date
    let releaseDate = releaseDateTextBox.value;
    let releaseDateCheck = Date.parse(releaseDate);
    if (isNaN(releaseDateCheck)) {
        isValidData = false;
        releaseDateTextBox.nextElementSibling.textContent = "Release date must be a valid date";
    }

    if (isValidData) {
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;

        // Split date string into an array "2023-10-24"
        // Result would be {"2023", "10", "24"}
        const dateParts = releaseDate.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Subtract 1 because months are index based
        const day = parseInt(dateParts[2]);
        const correctDate = new Date(year, month, day);

        addedBook.releaseDate = correctDate;

        return addedBook;
    }
    return null; // Return null if any invalid data is present
}

/**
 * This validates an ISBN 13 number. Returns true
 * if the ISBN only consists of 13 digit characters
 * @param data The string to be validated 
 * @returns True if data is a valid ISBN 13
 */
function isValidIsbn(data:string) {
    let regex = /^\d{13}$/; // match 13 digits exactly
    return regex.test(data);  
}

/**
 * Adds a Book object to web storage
 * all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook(b:Book):void {
    console.log(b);

    // Add the book to the webpage
    let bookDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`;

    // Add h2 to book div
    bookDiv.appendChild(titleHeading); 

    let bookDescription:HTMLParagraphElement = document.createElement("p");
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    let formattedPrice = currencyFormatter.format(b.price);
    bookDescription.textContent = `This book was released on ${b.releaseDate} and costs ${formattedPrice}`;
    bookDiv.appendChild(bookDescription);

    // Add bookDiv to web page
    document.querySelector("#book-display").appendChild(bookDiv);


}

function clearAllErrorMessages() {
    // Get all error spans
    let allSpans = document.querySelectorAll("span.error-msg")

    // Loop through, and set each span to an empty string
    for(let i = 0; i < allSpans.length; i++) {
        let currentSpans = allSpans[i];
        currentSpans.textContent = "";
    }
}