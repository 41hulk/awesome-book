var BooksArr = [];

function Book(title, author) {
	this.title = title;
	this.author = author;
}

function addBook(book) {
	const ul = document.querySelector("ul");
	ul.innerHTML += `
    <li>${book.title}</li>
		<li>${book.author}</li>
		<li><button class="delete" type="submit">Remove</button></li>
    <hr />
  `;
	const bookJson = JSON.stringify(BooksArr);
	localStorage.setItem("books", bookJson);
}

function addBookArr(title, author) {
	BooksArr.push(title, author);
	console.log(BooksArr);
}

function clearFields() {
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
}

function deleteBook(value) {
	if (value.classList.contains("delete")) {
		value.parentElement.parentElement.remove();
	}
}

const form = document.querySelector("form");

window.addEventListener("load", () => {
	const newBooks = localStorage.getItem("books");
	books = JSON.parse(newBooks);

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const title = document.querySelector("#title").value;
		const author = document.querySelector("#author").value;
		//Instantiate book
		const book = { title, author };
		BooksArr.push(book);
		console.log(BooksArr);
		//Display Book in UI
		addBook(book);
		// addBookArr(title,author);
		//Clear flieds
		clearFields();
	});
});

const list = document.querySelector(".list");
list.addEventListener("click", (e) => {
	const value = e.target;
	deleteBook(value);
});
