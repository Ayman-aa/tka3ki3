let quotes = [];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const likesCount = document.getElementById('likes-count');
const generateBtn = document.getElementById('generate-btn');
const charCountBtn = document.getElementById('char-count-btn');
const charCountNoSpacesBtn = document.getElementById('char-count-no-spaces-btn');
const wordCountBtn = document.getElementById('word-count-btn');
const likeBtn = document.getElementById('like-btn');
const infoDisplay = document.getElementById('info-display');
const addQuoteForm = document.getElementById('add-quote-form');
const filterForm = document.getElementById('filter-form');
const filteredQuotesContainer = document.getElementById('filtered-quotes-container');
const filteredQuoteText = document.getElementById('filtered-quote-text');
const filteredQuoteAuthor = document.getElementById('filtered-quote-author');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentQuoteId = null;
let filteredQuotes = [];
let currentFilteredQuoteIndex = 0;

async function loadQuotes() {
    try {
        const response = await fetch('quotes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        quotes = await response.json();
        generateRandomQuote();
    } catch (error) {
        console.error('Error loading quotes:', error);
        infoDisplay.textContent = 'Error loading quotes. Please try again later.';
        infoDisplay.classList.remove('hidden');
    }
}

function generateRandomQuote() {
    if (quotes.length === 0) {
        quoteText.textContent = "No quotes available";
        quoteAuthor.textContent = "";
        return;
    }
    
    if (quotes.length === 1) {
        displayQuote(quotes[0]);
        return;
    }
    
    let randomIndex;
    let randomQuote;
    
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
        randomQuote = quotes[randomIndex];
    } while (randomQuote.id === currentQuoteId);
    
    displayQuote(randomQuote);
}

async function saveQuotes() {
    try {
        const response = await fetch('update-quotes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quotes)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Quotes saved successfully:', result);
    } catch (error) {
        console.error('Error saving quotes:', error);
    }
}

addQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const quoteInput = document.getElementById('quote-input');
    const authorInput = document.getElementById('author-input');
    
    const newQuote = {
        id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 0,
        author: authorInput.value.trim(),
        quote: quoteInput.value.trim(),
        likes: 0
    };
    
    quotes.push(newQuote);
    
    quoteInput.value = '';
    authorInput.value = '';
    
    infoDisplay.textContent = `New quote by ${newQuote.author} added successfully!`;
    infoDisplay.classList.remove('hidden');
    
    displayQuote(newQuote);
});

window.addEventListener('load', loadQuotes);
