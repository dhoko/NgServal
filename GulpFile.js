var path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    tinylr      = require('tiny-lr'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    livereload  = require('gulp-livereload'),
    server      = tinylr(),
    openBrowser = require('./tasks/open');

/**
 * Create a watcher for a glob it can activate livereload too
 * @param  {Glob} path
 * @param  {Array} task  Task to launch
 * @param  {Boolean} watch Activate a watch for livereloadq
 */
function watchThemAll(path, task, watch) {
    var watcher = gulp.watch(path,task);
    if(watch) {
        watcher.on("change", function(file) {
            gutil.log('File updated', gutil.colors.yellow(file.path));
            livereload(server).changed(file.path);
        });
    }
}

// Default task : Open url, lauch server, livereaload
gulp.task('default',['assets','vendor','layout','templates','scripts','styles'], function() {

  // Open Google Chrome @ localhost:8080
    openBrowser();

    var app = express();

    app.use(bodyParser());
    app.use(express.static(path.resolve('./')));
    app.listen(1337, function() {
      gutil.log('Listening on', 1337);
    });

    // Proxy for our request
    app.all("/apitest", function(req,res) {
        // console.log();
        console.log(req.body);
        // console.log();
        res.send(201);
    });

    // Livereload listener
    server.listen(35729, function (err) {
        if (err) {
          throw err;
        }

        watchThemAll("./src/partials/**/*.html", ["templates"],true);
        watchThemAll("./src/js/**/*.js", ["scripts"],true);
        watchThemAll("./src/layout/*.html", ["layout"],true);
        watchThemAll("./src/styles/*.css", ["styles"],true);
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
gulp.task("i18n",function() {
    require("./tasks/i18n")(server);
});


// Set our env to production
gulp.task('env', function(){
    gutil.env.type = 'prod';
});
// Prod all the things !
gulp.task('prod',['env','assets','vendor','layout', 'templates','scripts','styles','i18n'], function (done) {
    // gulp.start("zip");
    done();
});

gulp.task('dev',['templates','scripts'], function() {
  // Livereload listener
  server.listen(35729, function (err) {
      if (err) {
          throw err;
      }
      watchThemAll("./src/js/**/*.js", ["scripts"],true);
  });

});
