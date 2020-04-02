const API_KEY = '0aa37f98cf6790bd00c62bf3bc4bc3b9';


function myFunction() {

  var myobj = document.getElementById("image");

  myobj.remove();

}


const upvote = document.createElement('button');
upvote.textContent = 'upvote';
upvote.onclick = function (e) {
	e.stopPropagation();
	triggerAPICall(`quotes/${document.querySelector('#popup').getAttribute('data-id')}/fav`, {
		method: 'PUT',
		headers: {
			Authorization: `Token token="${API_KEY}"`
		}
	})
}

const downvote = document.createElement('button');
downvote.textContent = 'downvote';
downvote.onclick = function (e) {
	e.stopPropagation();
	triggerAPICall(`quotes/${document.querySelector('#popup').getAttribute('data-id')}/unfav`, {
		method: 'PUT',
		headers: {
			Authorization: `Token token="${API_KEY}"`
		}
	})
}

const popup = document.createElement('div');
popup.innerHTML = '<div id="content"></div>';
popup.setAttribute('id', 'popup');
popup.appendChild(upvote);
popup.appendChild(downvote);
popup.addEventListener('click', function(e) {
	document.body.removeChild(popup);
});

function alertQuote(quote) {
// Em Dash character code

const endash = '\u2014';

const text = `<q>${quote.body}</q> </br> <p>${endash} ${quote.author}</p>`;

// Alert quote and credit author
popup.querySelector('#content').innerHTML = text;
popup.setAttribute('data-id', quote.id);

upvote.value = quote;
downvote.value = quote;

if (document.querySelector('#popup')) {
	document.body.removeChild(popup);
}

document.body.appendChild(popup);
}


function populateAuthors(data) {
	const authorList = document.querySelector('#authors');

	data.forEach(quote => {
		let listItem = document.createElement('li');
		let button = document.createElement('button');

		button.addEventListener('click', function (event) {
			alertQuote(quote)
		});

		button.textContent = quote.author;

		listItem.appendChild(button);

		authorList.appendChild(listItem);
	});
}


function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

async function triggerAPICall(endpoint = 'qotd', options = {}) {

// API URL

let url= `https://favqs.com/api/${endpoint}`;

if(options.queryParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    delete options.queryParams;
}


// Call API

let response = await fetch(url, options);

// Wait for promise to resolve and return a JSON object from API response

return await response.json();

}



function fetchQuote(){
  // Trigger API call

triggerAPICall()

// Handle API response

.then((data) => alertQuote(data.quote));

}


function getQuotesByAuthor() {

	triggerAPICall('quotes', {
		method: 'GET',
		headers: {
			Authorization: `Token token="${API_KEY}"`
		},
		queryParams: {
			type: 'author'
		}
	}).then(data => {
		populateAuthors(data.quotes);
	});
}

getQuotesByAuthor();
