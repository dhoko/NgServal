var gulp   = require('gulp'),
    concat = require("gulp-concat"),
    autoprefixer = require("gulp-autoprefixer");

/**
 * Concat our CSS
 */
module.exports = function() {

    gulp.src('./src/styles/*.css')
      .pipe(concat('main.css'))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./app/styles/'));
};
