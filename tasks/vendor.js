var fs     = require('fs'),
    gulp   = require('gulp'),
    gutil   = require('gulp-util'),
    es     = require('event-stream'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

/**
 * Build vendor, Concat and build our dependencies
 */
module.exports = function() {

    var dependencies = './node_modules',
        appDepenpendencies = './bower_components';

    return es.concat(
      gulp.src([
        appDepenpendencies + '/angular/angular.js',
        appDepenpendencies + '/angular-ui-router/release/angular-ui-router.js',
        dependencies + '/moment/moment.js',
        dependencies + '/swiftclick/js/libs/swiftclick.js',
        appDepenpendencies + '/ngBabelfish/dist/bundle.js'
      ])
        .pipe(concat('vendor.min.js', {newLine: ';'}))
        .pipe(('prod' === gutil.env.type) ? uglify() : gutil.noop())
        .pipe(gulp.dest('app/js')),
      gulp.src([
        // dependencies + '/normalize-css/normalize.css',
        appDepenpendencies + '/bootstrap/dist/css/bootstrap.css'
      ])
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest('app/styles'))
    );
};
