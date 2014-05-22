# NgServal

A boilerplate for **AngularJS** with browserify and Gulp. It's ready for i18n with Yaml files.

If you have [docker.js](http://jbt.github.io/docker/src/docker.js.html) you can also build your API documentation !

## How to install ?

### Requirements

- node.js
- npm

Ok, let's run : `npm install`

### Not included:

- Magic code *oh noooes!*
- Coffee *bad for your heart anyway*
- Give you the opportunity to twiddle your thumbs *sorry buddy

### Included:

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

## Helpers

Load the service `actions`, it provides you some helpers:

- `actions.openPage(page,delay)`
- `actions.reset(type, back2home)` :Clean your app's timeouts from actions.timeout. If back2home is true, it open the home page after `actions.TIMEOUT_BEFORE_HOME`
- `actions.repeat(cb, delay, msg)` : setInterval
- `actions.timeout(delay,cb,msg)` : setTimeout
