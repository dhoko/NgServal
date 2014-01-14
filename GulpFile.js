var appPath = 'app/',
    gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    express = require('express'),
    path    = require('path'),
    tinylr  = require('tiny-lr'),
    open    = require("gulp-open");

var createServers = function(port, lrport) {
  var lr = tinylr();
  lr.listen(lrport, function() {
    gutil.log('LR Listening on', lrport);
  });

  var app = express();
  app.use(express.static(path.resolve('./app/')));
  app.listen(port, function() {
    gutil.log('Listening on', port);
  });

  return {
    lr: lr,
    app: app
  };
};

var servers = createServers(8080, 35729);

gulp.task('default', function(){

  gulp.src(appPath + 'index.html').pipe(open('http://localhost:8080/',{app:"google-chrome"}));

  gulp.watch(["./**/*", "!./node_modules/**/*","!GulpFile.js"], function(evt){
    gutil.log(gutil.colors.cyan(evt.path), 'changed');
    servers.lr.changed({
      body: {
        files: [evt.path]
      }
    });
  });
});
