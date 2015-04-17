var path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    browserSync = require('browser-sync');
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    reload      = browserSync.reload;

// Default task : Open url, lauch server, livereaload
gulp.task('default',['assets','vendor','layout','templates','scripts','styles', 'i18n'], function() {

  var app = express();
  app.use(bodyParser());
  app.use(express.static(path.resolve('./')));
  app.listen(1337, function() {
    gutil.log('Listening on', 1337);
  });

  // Use a proxy in order to allow us to have an API to mock
  browserSync({
    proxy: "0.0.0.0:1337/app",
    browser: 'chromium-browser'
  });

  gulp.watch("./src/**/*.html", ["layout", "templates"]);
  gulp.watch("./src/js/**/*.js", ["scripts"]);
  gulp.watch("./src/**/*.css", ["styles"]);

  // Proxy for our request
  app.all("/apitest", function (req,res) {
     console.log(req.body);
    res.send(201);
  });
});

// Concatenate your partials and append them to index.html
gulp.task('templates', require('./tasks/templates'));

// Concatenate your partials and append them to index.html
gulp.task('layout', require('./tasks/layout'));

// Concatenate your app and build an app.js
gulp.task('scripts', require('./tasks/app'));

// Build my css
gulp.task('styles', require('./tasks/styles'));

// Build our assets
gulp.task('assets',require('./tasks/assets'));

// Build your vendors
gulp.task('vendor', require("./tasks/vendor"));

// Create i18n file for the app
gulp.task("i18n", require('./tasks/i18n'));


// Set our env to production
gulp.task('env', function(){
    gutil.env.type = 'prod';
});
// Prod all the things !
gulp.task('prod',['env','assets','vendor','layout', 'templates','scripts','styles','i18n'], function (done) {
    done();
});
