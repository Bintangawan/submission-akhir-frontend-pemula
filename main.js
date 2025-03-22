document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'bookshelf_app';
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    const bookForm = document.getElementById('bookForm');
    const searchForm = document.getElementById('searchBook');
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
  
    function saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  
    function renderBooks(filteredBooks = books) {
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      filteredBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookItem');
        bookElement.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button data-testid="bookItemEditButton">Edit Buku</button>
          </div>
        `;
  
        bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', function () {
          book.isComplete = !book.isComplete;
          saveToLocalStorage();
          renderBooks();
        });
  
        bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', function () {
          books = books.filter(b => b.id !== book.id);
          saveToLocalStorage();
          renderBooks();
        });
  
        bookElement.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', function () {
          document.getElementById('bookFormTitle').value = book.title;
          document.getElementById('bookFormAuthor').value = book.author;
          document.getElementById('bookFormYear').value = book.year;
          document.getElementById('bookFormIsComplete').checked = book.isComplete;
          books = books.filter(b => b.id !== book.id);
          saveToLocalStorage();
          renderBooks();
        });
  
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
    }
  
    bookForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const newBook = {
        id: new Date().getTime(),
        title: document.getElementById('bookFormTitle').value,
        author: document.getElementById('bookFormAuthor').value,
        year: Number(document.getElementById('bookFormYear').value),
        isComplete: document.getElementById('bookFormIsComplete').checked,
      };
  
      books.push(newBook);
      saveToLocalStorage();
      renderBooks();
      bookForm.reset();
    });
  
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const query = document.getElementById('searchBookTitle').value.toLowerCase();
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
      renderBooks(filteredBooks);
    });
  
    renderBooks();
  });
  