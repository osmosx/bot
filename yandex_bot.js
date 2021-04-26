// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Denis
// @match        https://yandex.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ['гобой', 'саксофон', 'как звучит флейта'];

let button = document.getElementsByClassName('button mini-suggest__button')[0];
let links = document.links;
let keyword = keywords[getRandom(0, keywords.length)];


if(button !== undefined) {
	document.getElementsByName('text')[0].value = keyword;
	document.getElementsByClassName('button mini-suggest__button')[0].click();
} else {
	for (let i=0; i<links.length; i++){
		if (links[i].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1){
			let link = links[i];
			link.removeAttribute("target");
			link.click();
			break;
		}
	}
}

function getRandom(min, max) {
	return Math.floor(Math.random()*(max-min)+min);
}
