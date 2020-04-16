let myLibrary = [];
const tableBody = document.querySelector('tbody');
const addBookBtn = document.querySelector('#add-btn');

function Book(title, author, pages, readStatus) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = Number(document.querySelector('#pages').value);
    let readStatus = document.querySelector('#read-selector').value;
    
    if (title == '' || author == '' || pages == '' || isNaN(pages)) return;
    
    myLibrary.push(new Book(title, author, pages, readStatus));
    
    resetInputFields();
}

function resetInputFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read-selector').value = 'No';
}

function render() {
    tableBody.innerHTML = '';
    
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

addBookBtn.addEventListener('click', () => {
    addBookToLibrary();
    render();
});

function addReadSelector(tableCell, myLibrary, index, key) {
    let readSelector = document.createElement('select');
    tableCell.appendChild(readSelector);
    array = ['No', 'Yes', 'Reading'];
    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        readSelector.appendChild(option);
    }

    let temp = myLibrary[index][key];

    for(let i, j = 0; i = readSelector.options[j]; j++) {
        if (i.value == temp) {
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

document.querySelectorAll("input").forEach(function(input) {
    input.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addBookBtn.click();
            document.querySelector('#title').focus();
            document.querySelector('#title').select();
        }
    });
});