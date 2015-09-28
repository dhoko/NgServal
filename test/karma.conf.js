module.exports = function(config) {

  'use strict';

  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/angular-ui-router/release/angular-ui-router.js',
      '../node_modules/angular-aria/angular-aria.js',
      '../node_modules/ng-babelfish/dist/bundle.js',
      '../node_modules/fastclick/lib/fastclick.js',

      '../node_modules/eventemitter2/lib/eventemitter2.js',

      '../src/js/**/index.js',
      '../src/js/**/**/*.js',
      '../app/js/templates.js',
      'specs/**/*.js',
      // 'mocks/**/*.js'
    ],


    // list of files to exclude
    exclude: ['**/*.min.js'],
    preprocessors: {
      '../src/js/**/**/*.js': ['babel', 'coverage'],
      'specs/**/*.js': ['babel']
    },

    // optionally, configure the reporter
    coverageReporter: {
      reporters:[
        {type: 'html', dir: 'coverage/'},
        {type: 'clover', dir: 'coverage/clover/'}
      ]
    },

    reporters: ['progress', 'coverage', 'junit'],
    junitReporter: {
      outputDir: 'coverage',
      outputFile: 'test-results.xml'
    },
    port: 9876,
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
