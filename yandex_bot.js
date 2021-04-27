// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Denis
// @match        https://yandex.ru/*
// @match        https://habr.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ['arduino', 'javascript', 'html','вектор'];

let button = document.getElementsByClassName('button mini-suggest__button')[0];
let links = document.links;
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementsByName('text')[0];
let i = 0;


if(button !== undefined) {
	let timerId = setInterval(()=> {
		yandexInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			button.click();
		}
	}, 1000);

}else if(location.hostname == "habr.com") {
	console.log("Мы на сайте");
	setTimeout(()=>{
		let index = getRandom(0,links.length);

		if(getRandom(0,101)>=70) {
			location.href = "https://yandex.ru/";
		}
		if(links[index].href.indexOf('habr.com')!=-1)
			links[index].click();
	},getRandom(2000,3500));
}
else{
	let nextYandexPage = true;
	for(let i=0; i<links.length; i++) {
		if(links[i].href.indexOf('habr.com')!=-1) {
			let link = links[i];
			nextYandexPage = false;
			console.log("Нашел фразу" + link);
			setTimeout(()=>{
				link.removeAttribute("target");
				link.click();},getRandom(1000,4500));
			break;
		}
	}
	if(document.querySelector('.pager__item_current_yes').textContent == "5") {
		nextYandexPage = false;
		location.href = "https://yandex.ru/";
	}

	if(document.querySelector('.pager__item_current_yes').textContent !== "5") {
		setTimeout(()=>{
			document.querySelector('.pager__item_kind_next').click();}
				   ,getRandom(3000,5000));
	}
}

function getRandom(min, max) {
	return Math.floor(Math.random()*(max-min)+min);
}
