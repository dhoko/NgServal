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
  app.use(express.static(path.resolve('./app/')));
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
    app:"google-chrome",
    url: "http://localhost:8080/"
  }));

  // Watch changes from CSS/JS/HTML ...
  gulp.watch(["./**/*", "!./node_modules/**/*","!GulpFile.js"], function(evt){
    gutil.log(gutil.colors.cyan(evt.path), 'changed');
    gulp.run(['partials','js']);
    servers.lr.changed({
      body: {files: [evt.path]}
    });

  });
});

// Clean JS files
gulp.task('js', function(){
  gulp.src(appPath + "js/**/*.js")
    .pipe(jscs())
    .pipe(jshint("./.jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"));
});

// Include partials in views
gulp.task('partials', function(){
  var fileinclude = require('gulp-file-include');
  gulp.src(appPath + "**/*.html")
    .pipe(fileinclude())
    .pipe(gulp.dest('./_tmpDist/'))
});

// Prod them all
gulp.task('prod', function(){
  var zip   = require('gulp-zip'),
      ngmin = require('gulp-ngmin'),
      uncss = require('gulp-uncss');

  gulp.run(['partials']);
  // Clean the CSS
  gulp.src(appPath + "*.css")
    .pipe(uncss({html: appPath + "**/*.html"}))
    .pipe(gulp.dest('_tmpDist'));

  // Build Angular for production
  gulp.src(appPath+'js/**/*')
    .pipe(ngmin())
    .pipe(gulp.dest('_tmpDist/js/'));

  // Compress them all
  gulp.src('_tmpDist/**/*')
    .pipe(zip('prod.zip'))
    .pipe(gulp.dest('dist'));
});


gulp.task('deploy', function() {

  gulp.run('prod');

  var ftp = require('gulp-ftp');
  gulp.src('dist/prod.zip')
    .pipe(ftp({
      host: 'dhoko',
      user: 'dhoko',
      pass: '1234'
    }));
})
