var gulp   = require('gulp'),
    concat = require("gulp-concat");

/**
 * Concat our CSS
 */
module.exports = function() {

    gulp.src('./app/styles/*.css')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('./build/styles/'));
};