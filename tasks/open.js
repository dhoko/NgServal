var gulp  = require('gulp'),
    opn = require("gulp-open");

/**
 * Update the manifest for an app
 * It will generate a new codename and also set our env for the prod zip
 */
module.exports = function() {

    // Open Google Chrome @ localhost:8080
    gulp.src('./app/index.html')
      .pipe(opn("",{
        // app:"google-chrome",
        app:"chromium-browser",
        url: "http://localhost:1337/app/"
     }));
};
