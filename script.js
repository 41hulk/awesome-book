var BooksArr = [];

function addBook() {

	const ul = document.querySelector("ul");

	ul.innerHTML +=BooksArr.map( 
		(book)=>`
    <li>${book.title}</li>
		<li>${book.author}</li>
		<li><button class="delete" type="submit">Remove</button></li>
    <hr />
  `,).join('');
  const bookJson = JSON.stringify(BooksArr);
  localStorage.setItem('books', bookJson);
}

function clearFields() {
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
}