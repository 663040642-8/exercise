let quotes = [];
let currentPage = 1;
let itemsPerPage = 5;

fetch('https://dummyjson.com/quotes?limit=100')
  .then(res => res.json())
  .then(data => {
    quotes = data.quotes;
    displayRandomQuote();
    render();
  });

function getRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("random-quote").textContent = `"${quote.quote}"`;
  document.getElementById("random-author").textContent = `— ${quote.author}`;
}

function displayRandomQuote() {
  getRandomQuote();
}

function displayQuotes() {
  const list = document.getElementById("quoteList");
  list.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const selectedQuotes = quotes.slice(start, start + itemsPerPage);

  selectedQuotes.forEach(q => {
    const card = document.createElement("div");
    card.className = "border border-gray-300 rounded p-4 bg-white shadow-md hover:shadow-lg transition";
    card.innerHTML = `<p>"${q.quote}"</p><p><strong>— ${q.author}</strong></p>`;
    list.appendChild(card);
  });
}

function setupPagination() {
  const totalPages = Math.ceil(quotes.length / itemsPerPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const maxVisible = 2;

  const createPageButton = (page) => {
    const btn = document.createElement("button");
    btn.textContent = page;
    btn.className = `mx-1 px-3 py-1 rounded border ${
      page === currentPage
        ? 'bg-blue-500 text-white border-blue-500'
        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
    }`;
    btn.disabled = page === currentPage;
    btn.onclick = () => {
      currentPage = page;
      render();
    };
    container.appendChild(btn);
  };

  if (totalPages <= 1) return;

  if (currentPage > maxVisible + 1) {
    createPageButton(1);
    container.appendChild(document.createTextNode(" ... "));
  }

  for (let i = currentPage - maxVisible; i <= currentPage + maxVisible; i++) {
    if (i > 0 && i <= totalPages) createPageButton(i);
  }

  if (currentPage < totalPages - maxVisible) {
    container.appendChild(document.createTextNode(" ... "));
    createPageButton(totalPages);
  }
}

function changeItemsPerPage() {
  itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);
  currentPage = 1;
  render();
}

function render() {
  displayQuotes();
  setupPagination();
}
