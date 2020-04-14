let myLibrary = [];
const tableBody = document.querySelector('table')
const buttons = { 
    addBook: document.querySelector('.test-btn'),
};
let deleteButtons = [];

function Book(title, author, pages, readStatus) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value;
    let pages = Number(document.querySelector('#pages').value);
    let readStatus = false;
    
    if (title == '' || author == '' || pages == '') return;
    
    myLibrary.push(new Book(title, author, pages, readStatus))
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
}

function renderTableHeader() {
    let headerRow = document.createElement('tr');
    
    let headerTitle = document.createElement('th');
    headerTitle.innerText = 'Title';
    headerRow.appendChild(headerTitle);
   
    let headerAuthor = document.createElement('th');
    headerAuthor.innerText = 'Author';
    headerRow.appendChild(headerAuthor);

    let headerPages = document.createElement('th');
    headerPages.innerText = 'Pages';
    headerRow.appendChild(headerPages);

    let headerReadStatus = document.createElement('th');
    headerReadStatus.innerText = 'Have you read this book?';
    headerRow.appendChild(headerReadStatus);

    let headerDelete = document.createElement('th');
    headerDelete.innerText = 'Delete?';
    headerRow.appendChild(headerDelete);

    tableBody.appendChild(headerRow);
}

function render() {
    tableBody.innerHTML = '';
    renderTableHeader()
    
    for (let index in myLibrary) {
        let tableRow = document.createElement('tr');
        for (let key in myLibrary[index]) {
            let tableCell = document.createElement('td');
            tableCell.innerText = myLibrary[index][key];
            tableRow.appendChild(tableCell);
        }
        let deleteBtn = document.createElement('button')
            deleteBtn.classList.add('delete')
            deleteBtn.innerHTML = 'Delete'
        tableRow.appendChild(deleteBtn);
        tableBody.appendChild(tableRow);
    }
    addDeleteListeners();
}

buttons.addBook.addEventListener('click', () => {
    addBookToLibrary();
    render();
});

function addDeleteListeners() {
	document.querySelectorAll(".delete").forEach(function(button) {
		button.addEventListener("click", function() {
            //alert(this.parentNode.rowIndex)
            myLibrary.splice(this.parentNode.rowIndex-1, 1)
            render();
		});
	});
}

// read status column still awkwardly shows 'false'