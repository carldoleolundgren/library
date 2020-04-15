let myLibrary = [];
const tableBody = document.querySelector('table')
const buttons = { 
    addBook: document.querySelector('.test-btn'),
};

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
    let readStatus = document.querySelector('#read-status').value;
    
    if (title == '' || author == '' || pages == '') return;
    
    myLibrary.push(new Book(title, author, pages, readStatus))
    
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read-status').value = 'Yes';
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
    headerReadStatus.innerText = 'Read?';
    headerRow.appendChild(headerReadStatus);

    let headerDelete = document.createElement('th');
    headerDelete.innerText = ' ';
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
            if (index == myLibrary.readStatus) {
                let readSelector = document.createElement('select');
                readSelector.add('Yes', 0)
                readSelector.add('No', 1)
                readSelector.add('Reading', 2)
                tableCell.appendChild(readSelector);
            } else { 
                tableCell.innerText = myLibrary[index][key];
            }
            tableCell.contentEditable = 'true';
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
            myLibrary.splice(this.parentNode.rowIndex-1, 1)
            render();
		});
	});
}

/*
let editBtn = document.createElement('button')
            editBtn.classList.add('edit')
            editBtn.innerHTML = 'Edit'
tableRow.appendChild(editBtn)
addEditListeners();

function addEditListeners() {
    document.querySelectorAll(".edit").forEach(function(button) {
		button.addEventListener("click", function() {
            if (this.innerHTML == 'Edit') {
                this.innerHTML = 'Save'

            } else this.innerHTML = 'Edit'



		});
	});
}

*/
// no way to change read status 
// no way to edit added entries 