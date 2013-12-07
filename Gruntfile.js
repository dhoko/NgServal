module.exports = function (grunt) {

    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Load NPM Tasks
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({

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
                files: ['app/**/*','dist/**/*'],
            }
        },

        autoprefixer : {
            options: {
                browsers : ['last 2 version']
            },
            no_dest: {
                src: 'app/*.css'
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
                    base: 'app',
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
                    'dev-breakshots/': ['app/*.html']
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

    });


    // Prod
    grunt.registerTask('dist', function(){
        grunt.task.run('uglify', 'autoprefixer', 'cssmin:dist');
    });

    // Dev
    grunt.registerTask('dev', function(){
        grunt.task.run('connect:server', 'open:localhost', 'watch','autoprefixer');
    });


    grunt.registerTask('shots:dev', function(){
        grunt.task.run('connect:server','breakshots:dev');
    });

};