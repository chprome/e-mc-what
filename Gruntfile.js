module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['server/test/**/*.js']
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
            'client/public/javascripts/app.js': ['client/assets/javascripts/*.js']
        },

        clean: ['client/public/stylesheets/main.css'],

        watch: {
            files: ['client/assets/stylesheets/*.styl', 'client/assets/javascripts/**/*.js', 'client/assets/views/**/*.hbs'],
            tasks: ['stylus', 'browserify'],
            options: {
                spawn: false,
            },
        }

    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('build', ['clean', 'jshint', 'stylus', 'browserify', 'watch']);
    grunt.registerTask('dist', ['clean', 'jshint', 'stylus', 'test']);

    grunt.registerTask('default', ['build']);

};

