var fs          = require('fs'),
    path        = require('path'),
    gulp        = require('gulp'),
    concat      = require("gulp-concat"),
    plumber     = require('gulp-plumber'),
    beautify    = require('gulp-beautify'),
    streamqueue = require('streamqueue'),
    sourcemaps  = require('gulp-sourcemaps'),
    ngAnnotate  = require('gulp-ng-annotate');
    browserSync = require('browser-sync');
    reload      = browserSync.reload;

/**
 * Create a single file app.js
 */
module.exports = function() {

  'use strict';

  /**
   * List each directory iniside i18n directory
   * From {@link https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md}
   * @param  {String} dir Directory
   * @return {Array}
   */
  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

   var folders = getFolders('./src/js');
   var stream = streamqueue({objectMode: true});

   // Create a stream for each content of directory
  for (var i = folders.length - 1; i >= 0; i--) {

    stream.queue(
      gulp.src(['./src/js/' + folders[i] + '/index.js', './src/js/' + folders[i] + '/**/*.js'])
        .pipe(plumber())
        .pipe(concat(folders[i] + '.js',  {newLine: "\n"}))
    );
  }

  return stream.done()
    .pipe(ngAnnotate({
      add: true,
      remove: true,
      single_quotes: true
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js', {newLine: "\n"}))
    .pipe(beautify({
      indentSize: 2,
      breakChainedMethods: true,
      preserveNewlines: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/js'))
    .pipe(reload({stream: true}));
};
