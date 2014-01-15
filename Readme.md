> It works with [Gulp](http://gulpjs.com) *The streaming build system*

## Install it

***You must have node***

- `git clone git@github.com:dhoko/boilerplate.git [folder]` (replace [folder] with a name, it is the destination folder)
- `cd [folder]`

### Prepare your environement

- Install **Sublime Linter** in Sublime Text for JShint
- Install LiveReload for Chrome [LiveReload Chrome Store](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
- `make prepare`

### Install the boilerplate

- `make install`
- `gulp serve`

### Tasks

- `gulp serve` : livereload + server + open Chrome + build HTML&JS
- `gulp deploy` : Push a zip of your app to your FTP
