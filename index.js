'use strict';
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const appMenu = require('./menu');
const tray = require('./tray');
const config = require('./config');

const app = electron.app;

require('electron-debug')();
require('electron-dl')();
require('electron-context-menu')();

let mainWindow;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

if (isAlreadyRunning) {
	app.quit();
}

function createMainWindow() {
	const lastWindowState = config.get('lastWindowState');
	const isDarkMode = config.get('darkMode');
	const maxWindowInteger = 2147483647; // Used to set max window width/height when toggling fullscreen
	const maxWidthValue = 850;

	const win = new electron.BrowserWindow({
		title: app.getName(),
		show: false,
		x: lastWindowState.x,
		y: lastWindowState.y,
		width: lastWindowState.width,
		height: lastWindowState.height,
		icon: process.platform === 'linux' && path.join(__dirname, 'static/Icon.png'),
		minWidth: 340,
		maxWidth: maxWidthValue,
		minHeight: 260,
		titleBarStyle: 'hidden-inset',
		autoHideMenuBar: true,
		darkTheme: isDarkMode, // GTK+3
		backgroundColor: isDarkMode ? '#192633' : '#fff',
		webPreferences: {
			preload: path.join(__dirname, 'browser.js'),
			nodeIntegration: false,
			plugins: true
		}
	});

	if (process.platform === 'darwin') {
		win.setSheetOffset(40);
	}

	win.loadURL('https://mobile.twitter.com/login');

	win.on('close', e => {
		if (!isQuitting) {
			e.preventDefault();

			if (process.platform === 'darwin') {
				app.hide();
			} else {
				win.hide();
			}
		}
	});

	win.on('page-title-updated', e => {
		e.preventDefault();
	});

	win.on('enter-full-screen', () => {
		win.setMaximumSize(maxWindowInteger, maxWindowInteger);
	});

	win.on('leave-full-screen', () => {
		win.setMaximumSize(maxWidthValue, maxWindowInteger);
	});

	return win;
}

app.on('ready', () => {
	electron.Menu.setApplicationMenu(appMenu);
	mainWindow = createMainWindow();
	tray.create(mainWindow);

	const page = mainWindow.webContents;

	page.on('dom-ready', () => {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'dark-mode.css'), 'utf8'));
		mainWindow.show();
	});

	page.on('new-window', (e, url) => {
		e.preventDefault();
		electron.shell.openExternal(url);
	});
});

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => {
	isQuitting = true;

	if (!mainWindow.isFullScreen()) {
		config.set('lastWindowState', mainWindow.getBounds());
	}
});
