<meta content="text/html; charset=UTF-8; X-Content-Type-Options=nosniff" http-equiv="Content-Type" />

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


const endash = '\u2014';

const text = `<q>${quote.body}</q> </br> <p>${endash} ${quote.author}</p>`;


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



let url= `https://favqs.com/api/${endpoint}`;

if(options.queryParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    delete options.queryParams;
}




let response = await fetch(url, options);



return await response.json();

}



function fetchQuote(){
  

triggerAPICall()



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

const invocation = new XMLHttpRequest();
const url = 'https://ayyeitsjoshh.github.io/CSSE-370/';
    
function callOtherDomain() {
  if (invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
