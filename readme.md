# <img src="media/Icon.png" width="45" align="left">Anatine

> Pristine Twitter app

<br>
<div align="center">
	<a href="https://github.com/sindresorhus/anatine/releases/latest" align="center">
		<img src="media/screenshot.png" width="617">
	</a>
</div>


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

[**Download**](https://github.com/sindresorhus/anatine/releases/latest) and unzip to some location.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `anatine.desktop` with the following contents:

```
[Desktop Entry]
Name=Anatine
Exec=/full/path/to/folder/Anatine
Terminal=false
Type=Application
Icon=/full/path/to/folder/Anatine/resources/app/media/Icon.png
```

### Windows

[**Download**](https://github.com/sindresorhus/anatine/releases/latest) and unzip to some location.


## Keyboard shortcuts

- New tweet/DM: <kbd>n</kbd>
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


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
