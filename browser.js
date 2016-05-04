'use strict';
const electron = require('electron');
const ipc = electron.ipcRenderer;
const storage = electron.remote.require('./storage');

ipc.on('compose-tweet', () => {
	document.querySelector('a[href$="/compose/tweet"]').click();
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
	const node = document.getElementById('zoomFactor');
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

	// hide navbar profile link
	// TODO: figure out a better way to detect when React is done
	setTimeout(() => {
		document.querySelector('header a[href$="/account"]').parentNode.style.display = 'none';
	}, 200);
});
