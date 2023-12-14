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
            Title.innerHTML = `Title: ${element.title}`;

            let Description = document.createElement('p');
            Description.innerHTML = `Description:\n${element.description}`;

            let Pages = document.createElement('p');
            Pages.innerHTML = `Book lenght: ${element.pages} pages.`

            // let Status = document.createElement("p");
            // Status.innerHTML = element.status;

            let buttonContainer = document.createElement("div");
            buttonContainer.setAttribute("class", "formButtons");

            let Read = document.createElement('button');
            if (element.status === 'Read') {
                Read.style.backgroundColor = 'green'
                Read.innerHTML = "Read";
            }
            else {
                Read.style.backgroundColor = 'red'
                Read.innerHTML = "Yet to be read";
            }
            Read.setAttribute("class", "readCardButton");
            Read.setAttribute("id", `status${element.Id}`)
            Read.setAttribute("onclick", `readStatus('status${element.Id}')`);

            let Delete = document.createElement("button");
            Delete.innerHTML = "Delete Book";
            Delete.setAttribute("class", "deleteCardButton");
            Delete.setAttribute("onclick", `deleteCard("${element.Id}")`);

            buttonContainer.appendChild(Read);
            buttonContainer.appendChild(Delete);

            bookContainer.appendChild(Title);
            bookContainer.appendChild(Description);
            bookContainer.appendChild(Pages);
            // bookContainer.appendChild(Status);
            bookContainer.appendChild(buttonContainer);

            container.appendChild(bookContainer)
        }
    });

    hIdeForm();
}
function readStatus(id) {
    let button = document.getElementById(id);
    if (button.style.backgroundColor === 'red') {
        button.style.backgroundColor = 'green';
        button.innerHTML = 'Read';
    }
    else {
        button.style.backgroundColor = 'red';
        button.innerHTML = 'Yet to be read';
    }
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

//for testing purposes
function exampleCards() {
    let i = 1;
    for (let j = 0; j < 4; j++) {
        let title = i;
        let description = i;
        let pages = i;
        let status = i;
        let ID = `book${Id}`;
        Id++;

        let book = new Book(title, description, pages, status, ID);
        library.push(book);

        addNewBook();
        i++
    }
}

exampleCards();
