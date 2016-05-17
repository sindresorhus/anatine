'use strict';
/* eslint-disable */

/* mousetrap v1.5.3 craig.is/killing/mice */
(function(C,r,g){function t(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function x(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function y(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);h=c;e=b;if(!e){if(!k){k={};for(var m in l)95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m)}e=k[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function B(a,b){return null===a||a===r?!1:a===b?!0:B(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,n;for(n in q)a[n]?b=!0:q[n]=0;b||(v=!1)}function h(a,b,n,f,c,h){var g,e,l=[],m=n.type;if(!d._callbacks[a])return[];"keyup"==m&&u(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){var k;(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e))}return l}function g(a,b,n,f){d.stopCallback(b,
b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=x(a);b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a))}function l(a,c,n,f){function e(c){return function(){v=c;++q[a];clearTimeout(k);k=setTimeout(b,1E3)}}function h(c){g(n,c,a);"keyup"!==f&&(w=x(c));setTimeout(b,10)}for(var d=q[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
y(c[d+1]).action);m(c[d],p,f,a,d)}}function m(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||r;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var q={},k,w=!1,p=!1,v=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=v||u(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)m(a[d],b,c)};t(a,"keypress",e);t(a,"keydown",e);t(a,"keyup",e)}var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",
20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(g=1;20>g;++g)l[111+g]="f"+g;for(g=0;9>=g;++g)l[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.init=function(){var a=c(r),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};c.init();C.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=
c);"function"===typeof define&&define.amd&&define(function(){return c})})(window,document);

/* mousetrap-global-bind.js */
(function(a){var c={},d=a.prototype.stopCallback;a.prototype.stopCallback=function(e,b,a,f){return this.paused?!0:c[a]||c[f]?!1:d.call(this,e,b,a)};a.prototype.bindGlobal=function(a,b,d){this.bind(a,b,d);if(a instanceof Array)for(b=0;b<a.length;b++)c[a[b]]=!0;else c[a]=!0};a.init()})(Mousetrap);

/* eslint-enable */

/*

This is copied from:
https://github.com/sindresorhus/refined-twitter/blob/master/extension/scroll-to-tweet.js

Updates should happen there first.

*/
const scrollToTweet = event => { // eslint-disable-line
	const $ = document.querySelector.bind(document);
	const tweets = document.querySelectorAll('._222QxFjc[role="row"]');
	const currentTop = window.scrollY;
	const bufferTop = 5; // added because somtimes the scrolling is off by a few px
	const keyCode = event.charCode; // TODO: replace with key when Chrome 51 is out https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

	// calculate the height of the navigation/header to use for scrolling
	const calculatedNavHeight = $('header').clientHeight + ($('header').clientHeight - $('nav').clientHeight);

	// this padding has to be applied to factor in the padding that's added to the container
	const tweetsContainerPadding = Math.ceil(parseInt($('._1nQuzuNK').style.paddingTop.replace('px', ''), 10));

	const offsetToNotShowTweetTopBorder = 2;

	// shortcut for getting the total offset from the top of the document of a particular tweet
	const totalOffset = tweetOffset => tweetOffset + calculatedNavHeight + tweetsContainerPadding + offsetToNotShowTweetTopBorder;

	// takes a tweet's offsetTop and checks if it's below the navigation bar
	const tweetIsBelowNav = offset => totalOffset(offset) > currentTop + bufferTop;

	let scrollTarget = 0;

	Array.from(tweets).some((tweet, index) => {
		// TODO: Replace with for...of loop when Chrome 51 is released https://mobile.twitter.com/chromiumdev/status/717736215433256960
		// if we're scrolling down, grab the offset of the tweet below the nav
		if (keyCode === 106) {
			scrollTarget = totalOffset(tweet.offsetTop);
		}

		// if we're scrolling up and on the first two items scroll to 0
		if (keyCode === 107 && index <= 1) {
			scrollTarget = 0;
		}

		// if we're scrolling up, grab the offset of the tweet before last
		if (keyCode === 107 && index > 1) {
			scrollTarget = totalOffset(tweets[index - 2].offsetTop);
		}

		return tweetIsBelowNav(tweet.offsetTop);
	});

	window.scrollTo(0, scrollTarget);
};

// ---------------------------------------------- //

/* globals Mousetrap */
const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const storage = remote.require('./storage');
const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

function changeTab(next) {
	const pages = [
		'/home',
		'/notifications',
		'/messages',
		'/search'
	];

	// TODO: these lines can probably be simplified, but I can't think right now
	const index = pages.indexOf(window.location.pathname) + (next ? 1 : -1);
	const ret = (index % pages.length + pages.length) % pages.length;

	$(`a[href$="${pages[ret]}"]`).click();
}

// sets interval to wait for selector to be ready before firing callback
function waitFor(selector) {
	return new Promise(resolve => {
		const el = $(selector);

		// shortcut if the element already exists
		if (el) {
			resolve(el);
			return;
		}

		// interval to keep checking for it to come into the DOM
		const awaitElement = setInterval(() => {
			const el = $(selector);

			if (el) {
				resolve(el);
				clearInterval(awaitElement);
			}
		}, 50);
	});
}

function newTweet() {
	if (window.location.pathname.split('/')[1] === 'messages') {
		$('a[href$="/home"]').click();
	}

	// wait for new tweet button to click it
	waitFor('a[href$="/compose/tweet"]').then(element => element.click());
}

function newDM() {
	$('a[href$="/messages"]').click();

	// wait for new message button to click it
	waitFor('a[href$="/messages/compose"]').then(element => element.click());
}

ipc.on('next-tab', () => {
	changeTab(true);
});

ipc.on('previous-tab', () => {
	changeTab(false);
});

function registerShortcuts(username) {
	Mousetrap.bind('n', () => {
		newTweet();
		return false;
	});

	Mousetrap.bind('m', () => {
		newDM();
		return false;
	});

	Mousetrap.bind('g h', () => {
		$('a[href$="/home"]').click();
	});

	Mousetrap.bind('g n', () => {
		$('a[href$="/notifications"]').click();
	});

	Mousetrap.bind('g m', () => {
		$('a[href$="/messages"]').click();
	});

	Mousetrap.bind('/', () => {
		$('a[href$="/search"]').click();
		return false;
	});

	Mousetrap.bind('g p', () => {
		$('a[href$="/account"]').click();
		$(`a[href$="/${username}"]`).click();
	});

	Mousetrap.bind('g l', () => {
		$('a[href$="/account"]').click();
		$(`a[href$="/${username}"]`).click();
		$(`a[href$="/${username}/likes"]`).click();
	});

	Mousetrap.bindGlobal('esc', () => {
		const btn = $('button._158OzO7l');

		if (btn) {
			btn.click();
		}
	});

	Mousetrap.bindGlobal('command+enter', () => {
		if (window.location.pathname === '/compose/tweet') {
			$('button._1LQ_VFHl._2cmVIBgK').click();
		}

		if (window.location.pathname.split('/')[1] === 'messages') {
			$('button[data-testid="dmComposerSendButton"]').click();
		}
	});

	Mousetrap.bind('backspace', () => {
		window.history.back();
	});

	// vim bindings
	const pageScrollPctHeight = 0.9;
	const fromScrollTop = n => document.body.scrollTop + n;
	const scrollToY = y => window.scrollTo(0, y);

	Mousetrap.bind('j', scrollToTweet);
	Mousetrap.bind('k', scrollToTweet);

	Mousetrap.bind('g g', () => {
		scrollToY(0);
	});

	Mousetrap.bind('ctrl+d', () => {
		scrollToY(fromScrollTop(window.innerHeight * pageScrollPctHeight));
	});

	Mousetrap.bind('ctrl+u', () => {
		scrollToY(fromScrollTop(window.innerHeight * -pageScrollPctHeight));
	});

	Mousetrap.bind('G', () => {
		scrollToY(document.body.scrollHeight);
	});
	// -- //
}

function setDarkMode() {
	document.documentElement.classList.toggle('dark-mode', storage.get('darkMode'));
}

ipc.on('toggle-dark-mode', () => {
	storage.set('darkMode', !storage.get('darkMode'));
	setDarkMode();
});

function init() {
	const state = JSON.parse($('.___iso-state___').dataset.state).initialState;
	const username = state.settings.data.screen_name;

	// activate Dark Mode if it was set before quitting
	setDarkMode();

	registerShortcuts(username);
}

ipc.on('new-tweet', newTweet);
ipc.on('new-dm', newDM);

ipc.on('log-out', () => {
	window.location.href = '/logout';
});

ipc.on('zoom-reset', () => {
	setZoom(1.0);
});

ipc.on('zoom-in', () => {
	const zoomFactor = storage.get('zoomFactor') + 0.1;

	if (zoomFactor < 1.6) {
		setZoom(zoomFactor);
	}
});

ipc.on('zoom-out', () => {
	const zoomFactor = storage.get('zoomFactor') - 0.1;

	if (zoomFactor >= 0.8) {
		setZoom(zoomFactor);
	}
});

function setZoom(zoomFactor) {
	const node = $('#zoomFactor');
	node.textContent = `body {zoom: ${zoomFactor} !important}`;
	storage.set('zoomFactor', zoomFactor);
}

// Inject a global style node to maintain zoom factor after conversation change.
// Also set the zoom factor if it was set before quitting.
function zoomInit() {
	const zoomFactor = storage.get('zoomFactor') || 1.0;
	const style = document.createElement('style');
	style.id = 'zoomFactor';

	document.body.appendChild(style);
	setZoom(zoomFactor);
}

document.addEventListener('DOMContentLoaded', () => {
	// TODO: Figure out how to loud external scripts here
	// [
	// 	path.resolve('vendor/mousetrap.js'),
	// 	path.resolve('vendor/mousetrap-global-bind.js')
	// ].forEach(src => {
	// 	const script = document.createElement('script');
	// 	script.src = `file://${src}`;
	// 	script.async = false;
	// 	document.head.appendChild(script);
	// });

	zoomInit();

	// enable OS specific styles
	document.documentElement.classList.add(`os-${process.platform}`);

	// detect when React is ready before firing init
	waitFor('#react-root header').then(init);
});
