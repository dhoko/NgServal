var fs     = require('fs'),
    gulp   = require('gulp'),
    es     = require('event-stream'),
    concat = require('gulp-concat');

/**
 * Build vendor, Concat and build our dependencies
 */
module.exports = function() {

    var dependencies = './node_modules';

    return es.concat(
      gulp.src([
        dependencies + '/angular/lib/angular.min.js',
        dependencies + '/angular-ui-router/release/angular-ui-router.min.js',
        dependencies + '/serval-i18n/bundle.js',
        // dependencies + '/serval-i18n/bundle.min.js',
        dependencies + '/moment/moment.js',
        dependencies + '/swiftclick/js/libs/swiftclick.js'
      ])
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest('build/js')),
      gulp.src(dependencies + '/normalize-css/normalize.css')
        .pipe(gulp.dest('build/styles'))
    );
};