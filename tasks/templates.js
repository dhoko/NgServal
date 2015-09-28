var path          = require('path'),
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    htmlmin       = require('gulp-htmlmin'),
    htmlify       = require('gulp-angular-htmlify'),
    templateCache = require('gulp-angular-templatecache');

/**
 * Create a cache for angular templates
 * Put some files in partials for compatibility
 * @return {Stream}
 */
module.exports = function() {

  'use strict';

  var sep = path.sep;

  return gulp.src([
      './src/partials/**/*.html',
      './src/js/**/partials/**/*.html'
    ])
    .pipe(rename(function (path) {
      path.basename =  path.dirname.split(sep)[0] + '-' + path.basename;
      path.dirname = '';
    }))
    .pipe(htmlify({
      customPrefixes: ['ui-']
    }))
    .pipe(htmlmin({collapseWhitespace: true, removeAttributeQuotes:true}))
    // .pipe(gulp.dest('./app/partials/'))
    .pipe(templateCache('templates.js', {
      root: 'partials/',
      module: 'templates',
      standalone: true
    }))
    .pipe(gutil.env.dist ? uglify() : gutil.noop())
    .pipe(gulp.dest('./app/js'))
    .pipe(reload({stream: true}));
};
