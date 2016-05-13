'use strict';
const os = require('os');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const appName = app.getName();

function sendAction(action, data) {
	const win = BrowserWindow.getAllWindows()[0];

	if (process.platform === 'darwin') {
		win.restore();
	}

	win.webContents.send(action, data);
}

const viewSubmenu = [
	{
		label: 'Reset Text Size',
		accelerator: 'CmdOrCtrl+0',
		click() {
			sendAction('zoom-reset');
		}
	},
	{
		label: 'Increase Text Size',
		accelerator: 'CmdOrCtrl+Plus',
		click() {
			sendAction('zoom-in');
		}
	},
	{
		label: 'Decrease Text Size',
		accelerator: 'CmdOrCtrl+-',
		click() {
			sendAction('zoom-out');
		}
	}
];

const helpSubmenu = [
	{
		label: `${appName} Website...`,
		click() {
			shell.openExternal('https://github.com/sindresorhus/anatine');
		}
	},
	{
		label: 'Report an Issue...',
		click() {
			const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->

-

${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;

			shell.openExternal(`https://github.com/sindresorhus/anatine/issues/new?body=${encodeURIComponent(body)}`);
		}
	}
];

if (process.platform !== 'darwin') {
	helpSubmenu.push({
		type: 'separator'
	}, {
		label: `About ${appName}`,
		click() {
			electron.dialog.showMessageBox({
				title: `About ${appName}`,
				message: `${appName} ${app.getVersion()}`,
				detail: 'Created by Sindre Sorhus',
				icon: path.join(__dirname, 'static/Icon.png'),
				buttons: []
			});
		}
	});
}

const darwinTpl = [
	{
		label: appName,
		submenu: [
			{
				label: `About ${appName}`,
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				label: 'Toggle Dark Mode',
				accelerator: 'Cmd+D',
				click() {
					sendAction('toggle-dark-mode');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Log Out',
				click() {
					sendAction('log-out');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Services',
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				label: `Hide ${appName}`,
				accelerator: 'Cmd+H',
				role: 'hide'
			},
			{
				label: 'Hide Others',
				accelerator: 'Cmd+Shift+H',
				role: 'hideothers'
			},
			{
				label: 'Show All',
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				label: `Quit ${appName}`,
				accelerator: 'Cmd+Q',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'File',
		submenu: [
			{
				label: 'New Tweet...',
				accelerator: 'Cmd+N',
				click() {
					sendAction('new-tweet');
				}
			},
			{
				label: 'New Direct Message...',
				accelerator: 'Shift+Cmd+N',
				click() {
					sendAction('new-dm');
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'Cmd+Z',
				role: 'undo'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+Cmd+Z',
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				accelerator: 'Cmd+X',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'Cmd+C',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'Cmd+V',
				role: 'paste'
			},
			{
				label: 'Select All',
				accelerator: 'Cmd+A',
				role: 'selectall'
			}
		]
	},
	{
		label: 'View',
		submenu: viewSubmenu
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'Cmd+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelerator: 'Cmd+W',
				role: 'close'
			},
			{
				type: 'separator'
			},
			{
				label: 'Next Tab',
				accelerator: 'Ctrl+Tab',
				click() {
					sendAction('next-tab');
				}
			},
			{
				label: 'Previous Tab',
				accelerator: 'Ctrl+Shift+Tab',
				click() {
					sendAction('previous-tab');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			},

			// temp workaround for:
			// https://github.com/sindresorhus/caprine/issues/5
			{
				label: 'Toggle Full Screen',
				accelerator: 'Ctrl+Cmd+F',
				click() {
					const win = BrowserWindow.getAllWindows()[0];
					win.setFullScreen(!win.isFullScreen());
				}
			}
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: helpSubmenu
	}
];

const otherTpl = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Tweet...',
				accelerator: 'Ctrl+N',
				click() {
					sendAction('new-tweet');
				}
			},
			{
				label: 'New Direct Message...',
				accelerator: 'Shift+Ctrl+N',
				click() {
					sendAction('new-dm');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Next Tab',
				accelerator: 'Ctrl+Tab',
				click() {
					sendAction('next-tab');
				}
			},
			{
				label: 'Previous Tab',
				accelerator: 'Ctrl+Shift+Tab',
				click() {
					sendAction('previous-tab');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Toggle Dark Mode',
				accelerator: 'Ctrl+D',
				click() {
					sendAction('toggle-dark-mode');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Log Out',
				click() {
					sendAction('log-out');
				}
			},
			{
				label: 'Quit',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Cut',
				accelerator: 'Ctrl+X',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'Ctrl+C',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'Ctrl+V',
				role: 'paste'
			}
		]
	},
	{
		label: 'View',
		submenu: viewSubmenu
	},
	{
		label: 'Help',
		role: 'help',
		submenu: helpSubmenu
	}
];

const tpl = process.platform === 'darwin' ? darwinTpl : otherTpl;

module.exports = electron.Menu.buildFromTemplate(tpl);
