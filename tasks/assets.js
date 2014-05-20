var gulp = require('gulp');

/**
 * Move assets to build
 */
module.exports = function() {
    gulp.src('./app/assets/**/*')
        .pipe(gulp.dest('./build/assets/'));
};