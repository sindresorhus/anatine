'use strict';
const path = require('path');
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
	// load vendor scripts
	[
		path.resolve('vendor/mousetrap.js'),
		path.resolve('vendor/mousetrap-global-bind.js')
	].forEach(src => {
		const script = document.createElement('script');
		script.textContent = `require('${src}')`;
		document.head.appendChild(script);
	});

	// load scrollToTweet as a module.
	const scrollToTweetPath = path.resolve('vendor/scroll-to-tweet.js');
	const script = document.createElement('script');
	script.textContent = `scrollToTweet = require('${scrollToTweetPath}')`;
	document.head.appendChild(script);

	zoomInit();

	// enable OS specific styles
	document.documentElement.classList.add(`os-${process.platform}`);

	// detect when React is ready before firing init
	waitFor('#react-root header').then(init);
});

// activate Dark Mode if it was set before quitting
// don't wait for React to be ready.
setDarkMode();
