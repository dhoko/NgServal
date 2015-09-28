# NgServal

A custom boilerplate for AngularJS, ready for i18n out of the box.

## How to install ?

### Requirements

- node.js with npm

Ok, let's run : `npm install`

## start development

```
$ npm start
```

## About ngServal

- A structure based on component
- ES2015 ready thanks to ba(*bi*)bel
- A great compilation process via Gulp
- i18n via [Angular NgBabelfish](https://github.com/dhoko/angular-ngBabelfish)
- An HTTP server with [Express.js](http://expressjs.com/) and browser-sync
- ...

## i18n

It's working via Yaml files.
See documentation for [Angular NgBabelfish](https://github.com/dhoko/angular-ngBabelfish).

## Explanation

```shell
.
├── GulpFile.js
├── README.md
├── .eslintrc
├── .editorconfig
├── package.json
├── app // final files
├── i18n // for i18n
  ├── fr-FR // A translation
    ├── _common.yml // i18n shared between each pages
    └── home.yml // i18n for the home page
  └── languages.json // i18n translations (build with gulp)
├── src // where you code
  ├── layout.html // Your app layout (header,footer...)
  ├── styles // Your css
  ├── assets // static files
  └── js // Your app
    └── core // Core module for your application (no custom code here except some routing and interceptors)
      └── partials // HTML partials for core module
        └── state // views for a state
    └── about // Ex component
      └── partials // HTML partials for the component
        └── state // views for a state
└── tasks // Directory for each of your gulp tasks
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

It runs a server with two urls:
  - [localhost:1337](http://locahost:1337/) based on express without livereload
  - [localhost:3000](http://locahost:3000/) a proxy of :1337 with browser-sync (*livereload*)


### Other tasks

You can modify each task, there are in the directory `tasks`.

> Templates,default,scripts are inside the gulpfile.
