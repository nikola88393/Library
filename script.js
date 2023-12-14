let Id = 1;
let library = [];

function Book(title, description, pages, status, Id) {
    this.title = title;
    this.description = description;
    this.pages = pages;
    this.status = status;
    this.Id = Id;
}

let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("yes").checked ? "Read" : "Not Read";
    let ID = `book${Id}`;
    Id++;

    let book = new Book(title, description, pages, status, ID);
    library.push(book);

    addNewBook();
})

function addNewBook() {
    let container = document.querySelector(".booksContainer");
    library.forEach(element => {
        if (document.getElementById(`${element.Id}`) === null) {
            let bookContainer = document.createElement('div');
            bookContainer.setAttribute('Id', element.Id);
            bookContainer.setAttribute('class', 'bookCard');

            let Title = document.createElement('h3');
            Title.innerHTML = element.title;

            let Description = document.createElement('p');
            Description.innerHTML = element.description;

            let Pages = document.createElement('p');
            Pages.innerHTML = `Book lenght: ${element.pages}`

            let Status = document.createElement("p");
            Status.innerHTML = element.status;

            let Delete = document.createElement("button");
            Delete.innerHTML = "Delete Book";
            Delete.setAttribute("Id", element.Id);
            Delete.setAttribute("onclick", `deleteCard("${element.Id}")`);

            bookContainer.appendChild(Title);
            bookContainer.appendChild(Description);
            bookContainer.appendChild(Pages);
            bookContainer.appendChild(Status);
            bookContainer.appendChild(Delete);

            container.appendChild(bookContainer)
        }
    });

    hIdeForm();
}

function showForm() {
    let form = document.querySelector(".formWrapper");

    form.style.display = "flex";
}

function hIdeForm() {
    let form = document.querySelector(".formWrapper");
    let titleInput = document.getElementById('title');
    titleInput.value = ""
    let textInput = document.getElementById('description');
    textInput.value = "";
    let pagesInput = document.getElementById('pages');
    pagesInput.value = "";
    let radioInputYes = document.getElementById("yes");
    let radioInputNo = document.getElementById("no");
    radioInputNo.checked = false;
    radioInputYes.checked = false;

    form.style.display = "none";
}

function deleteCard(Id) {
    for (let i = 0; i < library.length; i++) {
        let container = document.getElementById(`${library[i].Id}`);
        console.log(Id);
        console.log(library[i].Id);
        if (library[i].Id === Id && document.getElementById(`${library[i].Id}`) !== null) {
            library.splice(i, 1);
            container.remove();
            break;
        }
    }
    console.log(library);
}

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", showForm);