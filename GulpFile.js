var appPath = 'app/',
    gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    express = require('express'),
    path    = require('path'),
    tinylr  = require('tiny-lr'),
    open    = require("gulp-open"),
    jscs    = require('gulp-jscs'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var createServers = function(port, lrport) {
  var lr = tinylr();
  lr.listen(lrport, function() {
    gutil.log('LR Listening on', lrport);
  });

  var app = express();
  app.use(express.static(path.resolve('./build/')));
  app.listen(port, function() {
    gutil.log('Listening on', port);
  });

  return {
    lr: lr,
    app: app
  };
};

// Default task : Open url, lauch server, livereaload
gulp.task('default', function(){
  var servers = createServers(8080, 35729);
  // Open Google Chrome @ localhost:8080
  gulp.src(appPath + 'index.html').pipe(open("",{
    // app:"google-chrome",
    app:"/usr/lib/chromium/chromium",
    url: "http://localhost:8080/"
  }));

  // Watch changes from CSS/JS/HTML ...
  gulp.watch([
    "./**/*", "!./node_modules/**/*",
    "!./app/components/",
    "!./build/**/*",
    "!./GulpFile.js",
    "!./**/*.html"], function(evt){
    gutil.log(gutil.colors.cyan(evt.path), 'changed');
    gulp.run('js');
    gulp.run('moveJs');
    servers.lr.changed({
      body: {files: [evt.path]}
    });
  });

  gulp.watch(["./app/**/*.html"], function(evt){
    gutil.log(gutil.colors.cyan(evt.path), 'changed');
    gulp.run('partials');
    servers.lr.changed({
      body: {files: [evt.path]}
    });
  });

});

// Clean JS files
gulp.task('js', function(){
  gulp.src(appPath + "js/**/*.js")
    .pipe(jscs())
});

// Include partials in views
gulp.task('partials', function(){
  var fileinclude = require('gulp-file-include');
  gulp.src(appPath + "**/*.html")
    .pipe(fileinclude())
    .pipe(gulp.dest('./build/'))
});

gulp.task('moveJs', function(){
  gulp.src(appPath+'js/**/*')
    .pipe(gulp.dest('build/js/'));
  });

gulp.task('serve', function() {
  gulp.run('partials');
  gulp.run('moveJs');
  gulp.run('default');
})

// Prod them all
gulp.task('prod', function(){
  var zip       = require('gulp-zip'),
      ngmin     = require('gulp-ngmin'),
      uncss     = require('gulp-uncss'),
      timestamp = new Date().getTime();

  gulp.run('partials');
  // Clean the CSS
  gulp.src(appPath + "*.css")
    .pipe(uncss({html: appPath + "**/*.html"}))
    .pipe(gulp.dest('build'));

  // Build Angular for production
  gulp.src(appPath+'js/**/*')
    .pipe(ngmin())
    .pipe(gulp.dest('build/js/'));
});

// Compress them all
gulp.task('compress', function() {
  var zip       = require('gulp-zip'),
      timestamp = new Date().getTime();

  gulp.src('build/**/*')
    .pipe(zip('prod-' + timestamp + '.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
  var spawn = require('child_process').spawn
      path  = require("path");

  spawn('rm', ['-r', path.resolve('.') + '/build'], {stdio: 'inherit'});
});

// Send them all
gulp.task('deploy', function() {
  var ftp = require('gulp-ftp');

  gulp.run(['prod','compress']);
  gulp.src('dist/prod.zip')
    .pipe(ftp({
      host: 'dhoko',
      user: 'dhoko',
      pass: '1234'
    }));

  gulp.run('clean');
});

// A test https://npmjs.org/package/gulp-template

