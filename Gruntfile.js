module.exports = function (grunt) {

  // Displays the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  // Load NPM Tasks
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['app/**/*.js'],
      options: {
        curly     : true,
        eqeqeq    : true,
        immed     : true,
        latedef   : true,
        newcap    : true,
        unused    : true,
        boss      : true,
        eqnull    : true,
        browser   : true,
        strict    : false,
        trailing  : true,
        smarttabs : true,
        maxparams : 3,

        globals: {
          // Environments
          console:    true,
          module:    true,

          // General Purpose Libraries
          $:          true,
          jQuery:     true,
        },
        reporter: require('jshint-stylish'),
      }
    },

    uglify : {
      compile: {
        files: {
          "dist/scripts/main.js" : ['app/scripts/*.js']
        }
      },
      options: {
        report : 'gzip',
        banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author%>\n * License : <%= pkg.license %>\n * Build : <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    },

    watch : {
      styles: {
        files: [
          'app/*.css'
        ],
      },
      scripts: {
        files: [
          'GruntFile.js',
          'app/scripts/**/*.js'
        ],
        tasks: ['jshint']
      },
      livereload: {
        options: {
          livereload: true,
        },
        files: ['app/**/*'],
      }
    },

    autoprefixer : {
      options: {
        browsers : ['last 2 version']
      },
      no_dest: {
        src: 'dev/*.css'
      }
    },

    cssmin: {
      dist: {
        options: {
          report: 'gzip',
        },
        files: {
          'dist/styles.css': [
            'bower_components/normalize-css/normalize.css','app/*.css'
          ]
        }
      }
    },

    connect : {
      server: {
        options: {
          port: 1337,
          base: 'dev',
          hostname: ''
        }
      }
    },

    open : {
      localhost : {
        path: 'http://127.0.0.1:1337'
      },
    },

    breakshots: {
      dev : {
        options: {
          url : 'http://127.0.0.1:1337',
          ext : 'jpg',
          sizes: [
              [320,480],
              [480,640],
              [640,768],
              [768,1024],
              [1024,1024],
              [1200,1024],
            ]
        },
        files: {
          'dev-breakshots/': ['dev/*.html']
        },
      },
      dist : {
        options: {
          url : 'http://127.0.0.1:1337',
          ext : 'jpg',
          sizes: [
              [320,480],
              [480,640],
              [640,768],
              [768,1024],
              [1024,1024],
              [1200,1024],
            ]
        },
        files: {
          'dist-breakshots/': ['dist/*.html']
        },
      },
    },

    imagemin : {
      compile: {
        options: {
          optimizationLevel: 4,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: "dist/images",
            src: ["**/*.{png,jpg,jpeg,gif,svg}"],
            dest: "dist/images"
          }
        ]
      }
    },

    // concat : {
    //     dev: { files: '<%= config.scripts %>' }
    // },

    copy : {
      dev: {
        files: [
          {
            expand: true,
            cwd: "app/",
            src: ["**"],
            dest: "dev/"
          }
        ]
      },
    },

    includes: {
      html: {
        src: ['dev/**/*.html'], // Source files
        dest: 'dev/', // Destination directory
        flatten: true,
        cwd: '.'
        options: {
          silent: true,
        }
      }
    },

    browser_sync: {
      files: {
        src : ['dev/*.css', 'dev/**.*.html'],
      },
      options: {
        server: {
          baseDir: "dev"
        }
        ghostMode: {
          scroll: true,
          links: true,
          forms: true
        }
      },
    },

    shell: {
      rsync: {
        command: '~/dev/sync.sh',
        options: {
          stdout: true
        }
      }
    }

  });


  // Prod
  grunt.registerTask('dist', function(){
    grunt.task.run('uglify', 'autoprefixer', 'cssmin:dist','imagemin:compile');
  });

  // Dev
  grunt.registerTask('dev', function(){
    grunt.task.run('copy:dev', 'connect:server', 'open:localhost', 'watch','autoprefixer');
  });

  grunt.registerTask('mobile', function() {
    grunt.task.run('dev','browser_sync');
  })

  // Assemble templates templates
  grunt.registerTask('build', function(){
    grunt.task.run('copy:dev', 'includes:html','shell:rsync');
  });

  // Take screenshots with breakpoints (rwd)
  grunt.registerTask('shots:dev', function(){
    grunt.task.run('connect:server','breakshots:dev');
  });

  // Take screenshots with breakpoints (rwd)
  grunt.registerTask('shots:dist', function(){
    grunt.task.run('connect:server','breakshots:dist');
  });

};