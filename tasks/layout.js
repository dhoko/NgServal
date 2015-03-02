var gulp   = require('gulp'),
    concat = require("gulp-concat");

module.exports = function() {
    gulp.src('./src/layout.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./app/'));
};
