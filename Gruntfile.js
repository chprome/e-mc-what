module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-dalek');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({

        dalek: {
            options: {
                browser: ['chrome']
            },
            dist: {
                src: ['client/test/**/*.js']
            }
        },

        stylus: {
            compile: {
                files: {
                    'client/public/stylesheets/main.css': ['client/assets/stylesheets/*.styl']
                }
            },
        },

        jshint: {
            all: ['*.js', 'server/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        browserify: {
            'client/public/javascripts/app.js': ['client/assets/javascripts/app/*.js']
        },

        clean: ['client/public/stylesheets/main.css'],

        watch: {
            files: ['client/assets/stylesheets/*.styl', 'client/assets/javascripts/**/*.js', 'client/assets/views/**/*.hbs'],
            tasks: ['stylus', 'browserify'],
            options: {
                spawn: false,
            },
        },

        concat: {
            options: {
                separator: ';',
            },
            jslibs: {
                src: ['client/libs/javascripts/**/*.js'],
                dest: 'client/public/javascripts/libs.js',
            },
            csslibs: {
                src: ['client/libs/stylesheets/**/*.css'],
                dest: 'client/public/stylesheets/libs.css',
            },
        }

    });

    grunt.registerTask('test', 'dalek');
    grunt.registerTask('build', ['clean', 'jshint', 'stylus', 'browserify', 'concat:*', 'watch']);

    grunt.registerTask('default', ['build']);

};

