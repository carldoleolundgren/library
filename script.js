let myLibrary = [
    {title: "GOT", author: "Tolkien", pages: 123, readStatus: false}
];

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
    console.table(myLibrary);
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
}

const tableBody = document.querySelector('table')

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

const deleteBtn = document.createElement('button')
deleteBtn.classList.add('delete')
deleteBtn.innerHTML = 'Delete'

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
        tableRow.appendChild(deleteBtn);
        tableBody.appendChild(tableRow);
    }
}

const buttons = { 
    addBook: document.querySelector('.test-btn'),
    deleteBook: document.querySelectorAll('.delete')
};

buttons.addBook.addEventListener('click', () => {
    addBookToLibrary();
    render();
});

buttons.deleteBook.addEventListener('click', (e) => {

});