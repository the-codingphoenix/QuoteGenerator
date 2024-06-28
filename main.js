//fetching quotes using API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    //Pick A Random Quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote length to determine styling
    if(quote.text.length > 90) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
// Asynchronus function can run at any time independently. It won't stop the browser from loading
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    //attempt to complete the fetch request
    try {
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch error and handle here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// button event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();