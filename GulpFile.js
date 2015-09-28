var gulp  = require('gulp');

// Default task : Open url, lauch server, livereaload
gulp.task('default',['vendor', 'assets', 'layout','templates','scripts','styles', 'i18n'], function() {

  'use strict';

  gulp.start('server');

  gulp.watch('src/**/*.html', ['layout', 'templates']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.css', ['styles']);
  gulp.watch('i18n/**/*.yml', ['i18n']);

});

gulp.task('server', function() {
  require('./tasks/server')();
});

// Concatenate your partials and append them to index.html
gulp.task('templates', require('./tasks/templates'));

// Concatenate your partials and append them to index.html
gulp.task('layout', require('./tasks/layout'));

// Concatenate your app and build an app.js
gulp.task('scripts', require('./tasks/app'));

// Build my css
gulp.task('styles', require('./tasks/styles'));

// Build your vendors
gulp.task('vendor', require('./tasks/vendor'));


// Create i18n file for the app
gulp.task('i18n', require('./tasks/i18n'));
gulp.task('assets', require('./tasks/assets'));


// Prod all the things !
gulp.task('prod', ['vendor','assets','layout', 'templates','styles','i18n','scripts']);


