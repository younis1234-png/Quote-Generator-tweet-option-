const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

const loader = document.getElementById("loader")
// How loading
function showLoadingSpinner(){
    // we want to show it 
    loader.hidden= false
    // and we want to hid our quote container
    quoteContainer.hidden = true
}
// hide loading 
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// https://forismatic.com/en/api/
// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
// https://www.w3schools.com/howto/howto_css_loader.asp loading animation


// Get quote from API
async function getQuote(){
showLoadingSpinner()

const proxyUrl= "https://cors-anywhere.herokuapp.com/"
const apiUrl= "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"

//try/catch  statement ()
try{
// set our respond
const response = await fetch(proxyUrl + apiUrl)
const data = await response.json()

// if author is blank add "unknown"
if(data.quoteAuthor === ""){
    authorText.innerText= "Unknown"
}else {
    authorText.innerText = data.quoteAuthor
}

// reduce font size for long quote
if(data.quoteText.length > 120){
    quoteText.classList.add("long-quote")
}else{
    quoteText.classList.remove("long-quote")
}

// authorText.innerText= data.quoteAuthor
quoteText.innerText = data.quoteText

// stop loader, show quote
removeLoadingSpinner()

}catch(error){
    // if we hit a error we want to get a new quote 
    getQuote()
}

}

// Tweet quote
function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`
   
    window.open(twitterUrl, "_blank")
}

// Event Listeners

newQuoteBtn.addEventListener("click", getQuote)
twitterBtn.addEventListener("click", tweetQuote)

 


// On load
getQuote()