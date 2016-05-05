'use strict';
const electron = require('electron');
const ipc = electron.ipcRenderer;
const storage = electron.remote.require('./storage');
const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

let username;

function init() {
	// hide navbar profile link
	$('header a[href$="/account"]').parentNode.style.display = 'none';

	const state = JSON.parse($('.___iso-state___').dataset.state).initialState;
	username = state.settings.data.screen_name;
}

ipc.on('go', (e, path) => {
	const el = document.activeElement;

	if (el && (el.tagName.toLowerCase() === 'input' ||
		el.tagName.toLowerCase() === 'textarea')) {
		return;
	}

	if (path === 'profile') {
		path = username;
		$('a[href$="/account"]').click();
	}

	if (path === 'likes') {
		path = `${username}/likes`;
		$('a[href$="/account"]').click();
		$(`a[href$="/${username}"]`).click();
	}

	$(`a[href$="/${path}"]`).click();
});

ipc.on('new-tweet', () => {
	$('a[href$="/compose/tweet"]').click();
});

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
	zoomInit();

	// TODO: figure out a better way to detect when React is done
	setTimeout(init, 200);
});
