let myLibrary = [
    {title: 'Three Body Problem',
    author: 'Cixin Liu',
    pages: 303,
    readStatus: 'Yes'}
];
const tableBody = document.querySelector('tbody');
let myLibrary_serialized;

render();

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.readStatus = readStatus
    }
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = Number(document.querySelector('#pages').value);
    let readStatus = document.querySelector('#read-selector').value;
    
    if (title == '' || author == '' || pages == '' || isNaN(pages)) return;
    
    myLibrary.push(new Book(title, author, pages, readStatus));
    
    resetInputFields();
    setLocalStorage();
    render();
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

    let chosenSelectorOption = myLibrary[index][key];

    for(let i, j = 0; i = readSelector.options[j]; j++) {
        if (i.value == chosenSelectorOption) {
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
	document.querySelectorAll(".delete").forEach( (button) => {
		button.addEventListener("click", function() {
            myLibrary.splice(this.parentNode.rowIndex-1, 1)
            setLocalStorage();
            render();
		});
	});
}

function addBookOnEnter() {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#add-btn').click();
        document.querySelector('#title').focus();
        document.querySelector('#title').select();
    }
}

function setLocalStorage() {
    myLibrary_serialized = JSON.stringify(myLibrary)
    localStorage.setItem('myStoredLibrary', myLibrary_serialized)
}

function updateMyLibrary() {
    for (i = 0; i < tableBody.rows.length; i++) {
        if (tableBody.rows[i].cells[0].innerText != myLibrary[i]['title'] ||
        tableBody.rows[i].cells[1].innerText != myLibrary[i]['author'] ||
        tableBody.rows[i].cells[2].innerText != myLibrary[i]['pages'] ||
        tableBody.rows[i].cells[3].firstChild.value != myLibrary[i]['readStatus']
        ) {
            myLibrary[i]['title'] = tableBody.rows[i].cells[0].innerText;
            myLibrary[i]['author'] = tableBody.rows[i].cells[1].innerText;
            myLibrary[i]['pages'] = tableBody.rows[i].cells[2].innerText;
            myLibrary[i]['readStatus'] = tableBody.rows[i].cells[3].firstChild.value;
        } 
    }
    setLocalStorage()
}

document.querySelector('#add-btn').addEventListener('click', () => {
    addBookToLibrary();
});

document.querySelectorAll('input').forEach( (input) => {
    input.addEventListener('keyup', () => {
        addBookOnEnter();        
    });
});

document.querySelector('#read-selector').addEventListener('keyup', () => {
    addBookOnEnter();
});

document.querySelector('#save-btn').addEventListener('click', () => {
    updateMyLibrary()
});

window.addEventListener('load', () => {
    myLibrary = JSON.parse(localStorage.getItem('myStoredLibrary'));
    if (myLibrary == null) myLibrary = [
        {title: 'Three Body Problem',
        author: 'Cixin Liu',
        pages: 303,
        readStatus: 'Yes'}
    ];
    render();
})