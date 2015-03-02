var gulp = require('gulp');

/**
 * Move assets to build
 */
module.exports = function() {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./app/assets/'));

    gulp.src('./bower_components/bootstrap/fonts/*')
      .pipe(gulp.dest('./app/fonts/'));

    gulp.src('./src/assets/favicon*')
        .pipe(gulp.dest('./app/'));
};
