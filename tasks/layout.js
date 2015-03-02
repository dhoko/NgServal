var gulp   = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    concat      = require("gulp-concat");

module.exports = function() {
  gulp.src('./src/layout.html')
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./app/'))
    .pipe(reload({stream: true}));
};
