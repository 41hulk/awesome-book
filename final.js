class Book {
	constructor(title, author, id) {
		this.title = title;
		this.author = author;
		this.id = id;
	}
}

let myBooks = [];
const container = document.querySelector(".book-container");
const form = document.querySelector("#form");

class UI {
	addBook(book) {
		const bookDiv = document.createElement("div");
		const h2 = document.createElement("h2");
		const h3 = document.createElement("h3");
		const removeBtn = document.createElement("button");
		removeBtn.classList.add("delete");
		h2.textContent = book.title;
		h3.textContent = book.author;
		removeBtn.textContent = "Remove";
		removeBtn.setAttribute("id", book.id);
		bookDiv.appendChild(h2);
		bookDiv.appendChild(h3);
		bookDiv.appendChild(removeBtn);
		container.appendChild(bookDiv);
		const bookJson = JSON.stringify(myBooks);
		localStorage.setItem("books", bookJson);
	}

	displayBooks() {
		if (localStorage.getItem("books") === null) {
			myBooks = [];
		} else {
			myBooks = JSON.parse(localStorage.getItem("books"));
		}
		myBooks.forEach((element) => {
			addBook(element);
		});
	}

	clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
	}

	deleteBook(bookId) {
		myBooks = myBooks.filter((book) => book.id !== bookId);
		localStorage.setItem("books", JSON.stringify(myBooks));
	}
}

//Event Listener for Add a Book
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const id = Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substr(0, 5);
	// Instantiate Book
	const book = new Book(title, author, id);
	//Instantiate UI
	const ui = new UI();
	// Display Book in UI
	myBooks = myBooks.concat(book);
	ui.addBook(book);
	// Clear Fields
	ui.clearFields();
});

//Event Listener for delete a book
container.addEventListener("click", (e) => {
	const ui = new UI();
	if (e.target.classList.contains("delete")) {
		e.target.parentElement.remove();
		ui.deleteBook(e.target.id);
	}
});

const ui = new UI();
window.addEventListener("DOMContentLoaded", ui.displayBooks);
