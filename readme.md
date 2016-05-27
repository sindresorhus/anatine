# Anatine <img src="static/Icon.png" width="60">

> Pristine Twitter app

<br>
<div align="center">
	<a href="https://github.com/sindresorhus/anatine/releases/latest" align="center">
		<img src="media/screenshot.png" width="617">
	</a>
</div>


## Features

### Dark mode

You can toggle dark mode in the `Anatine` menu or with <kbd>Cmd/Ctrl</kbd> <kbd>Shift</kbd> <kbd>D</kbd> / <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>D</kbd>.

<div align="center">
	<img src="media/screenshot-dark.png" width="617">
</div>

### Background behavior

When closing the window, the app will continue running in the background, in the dock on OS X and the tray on Linux/Windows. Right-click the dock/tray icon and choose `Quit` to completely quit the app. On OS X, click the dock icon to show the window. On Linux, right-click the tray icon and choose `Toggle` to toggle the window. On Windows, click the tray icon to toggle the window.

### Keyboard shortcuts

- New tweet: <kbd>n</kbd>
- New DM: <kbd>m</kbd>
- Send tweet/DM: <kbd>Cmd</kbd> <kbd>Enter</kbd> or <kbd>Ctrl</kbd> <kbd>Enter</kbd>
- Go to Home: <kbd>g</kbd> <kbd>h</kbd>
- Go to Notifications: <kbd>g</kbd> <kbd>n</kbd>
- Go to Messages: <kbd>g</kbd> <kbd>m</kbd>
- Go to Search: <kbd>/</kbd>
- Go to Profile: <kbd>g</kbd> <kbd>p</kbd>
- Go to Likes: <kbd>g</kbd> <kbd>l</kbd>
- Go to previous page: <kbd>Delete</kbd> or <kbd>Backspace</kbd>
- Next tab: <kbd>Ctrl</kbd> <kbd>Tab</kbd>
- Previous tab: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>Tab</kbd>
- Go to next tweet: <kbd>j</kbd>
- Go to previous tweet: <kbd>k</kbd>
- Page down: <kbd>Ctrl</kbd> <kbd>d</kbd>
- Page up: <kbd>Ctrl</kbd> <kbd>u</kbd>
- Scroll to top: <kbd>g</kbd> <kbd>g</kbd>
- Scroll to bottom: <kbd>G</kbd>


## Install

*OS X 10.9+, Windows 7+ & Linux are supported.*

### OS X

#### [Homebrew Cask](http://caskroom.io)

```
$ brew update && brew tap caskroom/cask && brew cask install anatine
```

#### Manually

[**Download**](https://github.com/sindresorhus/anatine/releases/latest), unzip, and move `Anatine.app` to the `/Applications` directory.

### Linux

<img src="media/screenshot-linux.jpg" width="200">

[**Download**](https://github.com/sindresorhus/anatine/releases/latest) and unzip to some location.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `anatine.desktop` with the following contents:

```
[Desktop Entry]
Name=Anatine
Exec=/full/path/to/folder/Anatine
Terminal=false
Type=Application
Icon=/full/path/to/folder/Anatine/resources/app/static/Icon.png
```

### Windows

<img src="media/screenshot-windows.jpg" width="200">

[**Download**](https://github.com/sindresorhus/anatine/releases/latest) and unzip to some location.


---


## Dev

Built with [Electron](http://electron.atom.io).

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build OS X: `$ npm run build:osx`
- Build Linux: `$ npm run build:linux`
- Build Windows: `$ npm run build:windows`
- Build all: `$ brew install wine` and `$ npm run build` *(OS X only)*


## Related

- [Refined Twitter](https://github.com/sindresorhus/refined-twitter) - Chrome extension of this app
- [Caprine](https://github.com/sindresorhus/caprine) - Facebook Messenger app


## Created by

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Paul Molluzzo](https://github.com/paulmolluzzo)
- [Daniel Pham](https://github.com/danhp)
- [Contributors…](https://github.com/sindresorhus/anatine/graphs/contributors)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
