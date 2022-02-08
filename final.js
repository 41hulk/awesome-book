function Book(title, author, id) {
	this.title = title;
	this.author = author;
	this.id = id;
}

let myBooks = [];
const container = document.querySelector(".book-container");

function addBook(book) {
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
}

function displayBooks() {
	myBooks.forEach((element) => {
		addBook(element);
	});
}

function clearFields() {
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
}

function deleteBook(bookId) {
	myBooks = myBooks.filter((book) => book.id !== bookId);
}

const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const id = Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substr(0, 5);
	//Instantiate Book
	const book = new Book(title, author, id);
	//Display Book in UI
	myBooks = myBooks.concat(book);
	addBook(book);
	//Clear Fields
	clearFields();
});

window.addEventListener("DOMContentLoaded", displayBooks);

container.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		e.target.parentElement.remove();
		deleteBook(e.target.id);
	}
});
