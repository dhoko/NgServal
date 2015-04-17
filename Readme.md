# NgServal

A boilerplate for **AngularJS** with browserify and Gulp. It's ready for i18n with Yaml files.

If you have [docker.js](http://jbt.github.io/docker/src/docker.js.html) you can also build your API documentation !

## How to install ?

### Requirements

- node.js, npm
- bower

Ok, let's run : `npm install`

## start development

```
$ npm start
```

## About ngServal

- A structure
- A great compilation process via Gulp
- Browserify
- Normalize.css
- Moment.js
- i18n
- Documentation with [Docker](https://github.com/jbt/docker)
- An HTTP server with [Express.js](http://expressjs.com/)
- some helpers
- ... all you need to begin a great app and being happy

### Not included:

- Magic code *oh noooes!*
- Coffee *bad for your heart anyway*
- Give you the opportunity to twiddle your thumbs *sorry buddy


## i18n

See documentation for [Angular NgBabelfish](https://github.com/dhoko/angular-ngBabelfish).

## Explanation

```shell
.
├── GulpFile.js
├── README.md
├── .jshintrc
├── .editorconfig
├── package.json
├── build // final files
├── i18n // for i18n
    ├── fr-FR // A translation
        ├── _common.yml // i18n shared between each pages
        └── home.yml // i18n for the home page
    └── languages.json // i18n translations (build with gulp)
├── src // where you code
    ├── layout.html // Your app layout (header,footer...)
    ├── styles // Your css
    ├── assets // static files
    └── js // Your backbone app
        └── core // The module Application
            └── partials // HTML partials for core module
└── tasks // Directory for each of your gulp tasjs
```

## Documentation

```
$ gulp doc
```

## About the gulpFile.js

The gulpFile contains our tasks in order to built|dev the application, there are

- *assets* : Move our assets from `src/assets/` to `build/assets/`
- *vendor* : Concatenate Backbone,lodash etc. and build a `vendor.min.js`
- *templates* : Build an `index.html` with each partials as scripts
- *scripts* : Build the backbone application
- *styles* : Move our CSS to `build/styles/`
- *manifest* : Update our app manifest an update the version
- *i18n* : Build the i18n `languages.json` file
- *zip* : Zip de content of build directory
- *doc* : Create an API documentation with Docco
- *prod* : Build the application, aggregate each previous tasks
- *default* : Default taskW

### default task, to dev

This task will start a server with express.js, it will start the server and open the browser to : `http://localhost:8080/build/`.

It also provides you a wrappper for an API, `http://localhost:8080/apitest`, it can be access throught POST|GET|DELETE|PUT|PATCH... Any http request you want.

This task launch liverload, so you have to install [Livereload for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) in your browser.


### Other tasks

You can modify each task, there are in the directory `tasks`.

> Templates,default,scripts are inside the gulpfile.
