var gulp        = require('gulp'),
    path        = require('path'),
    concat      = require("gulp-concat");
    tap         = require('gulp-tap'),
    rename      = require('gulp-rename'),
    gutil       = require('gulp-util'),
    htmlify = require('gulp-angular-htmlify');


module.exports = function() {
    gulp.src('./app/scripts/**/partials/*.html')
        .pipe(htmlify())
        .pipe(tap(function (file) {
            gutil.env.module = path.relative('./app/scripts/',file.path).split(path.sep)[0];
        }))
        .pipe(rename(function (path) {
            path.dirname = '';
            path.basename = gutil.env.module + '-' + path.basename;
        }))
        .pipe(gulp.dest('./build/partials/'));
}