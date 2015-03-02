var gulp        = require('gulp'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    htmlify       = require('gulp-angular-htmlify'),
    templateCache = require('gulp-angular-templatecache');

/**
 * Create a cache for angular templates
 * Put some files in partials for compatibility
 * @return {Stream}
 */
module.exports = function() {
  return gulp.src([
      './src/partials/**/*.html'
    ])
    .pipe(htmlify())
    .pipe(gulp.dest('./app/partials/'))
    .pipe(templateCache('templates.js', {
      root: 'partials/'
    }))
    .pipe(gulp.dest('./app/js'))
    .pipe(reload({stream: true}));
}
