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
    
    if (title == '' || author == '' || pages == '' || isNaN(pages)) return;
    
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
} // rework this into a for loop

function render() {
    tableBody.innerHTML = '';
    renderTableHeader()
    
    for (let index in myLibrary) {
        let tableRow = document.createElement('tr');
        for (let key in myLibrary[index]) {
            let tableCell = document.createElement('td');
            if (key == 'readStatus') {
                addReadSelector(tableCell, myLibrary, index, key);
            } else { 
                tableCell.innerText = myLibrary[index][key];
                tableCell.contentEditable = 'true';
            }
            tableRow.appendChild(tableCell);
        }
        let deleteBtn = addDeleteBtn();
        tableRow.appendChild(deleteBtn);
        tableBody.appendChild(tableRow);
    }
    addDeleteListeners();
}

buttons.addBook.addEventListener('click', () => {
    addBookToLibrary();
    render();
});

function addReadSelector(tableCell, myLibrary, index, key) {
    let readSelector = document.createElement('select');
    tableCell.appendChild(readSelector);
    array = ['Yes', 'No', 'Reading'];
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        readSelector.appendChild(option);
    }

    let temp = myLibrary[index][key];
    console.log(temp)

    for(let i, j = 0; i = readSelector.options[j]; j++) {
        if(i.value == temp) {
            readSelector.selectedIndex = j;
            break;
        }
    }
}

function addDeleteBtn() {
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = 'Delete';
    return deleteBtn;
}

function addDeleteListeners() {
	document.querySelectorAll(".delete").forEach(function(button) {
		button.addEventListener("click", function() {
            myLibrary.splice(this.parentNode.rowIndex-1, 1)
            render();
		});
	});
}

// does not set readStatus correctly