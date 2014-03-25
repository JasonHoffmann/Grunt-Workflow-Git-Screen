module.exports = function (grunt) {
  "use strict";

  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    /* Set this to the relative path of your project's index.html file */
    local: 'src',

    pkg: grunt.file.readJSON('package.json'),


    /*  
    *  Basic Compression and JS Hinting for project files + SASS concat task
    */

    jshint: {
      options: {
        force: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        asi: true,
        globals: {
          console: true,
          require: true,
          module: true
        }
      },
      files: [
        'Gruntfile.js',
        'package.json',
        'config.json',
        '<%= local %>/**/*.js'
      ]
    },

    imagemin: {
      compile: {
        options: {
          optimizationLevel: 4,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= local %>/assets/images/ %>',
            src: ['**/*.{png,jpg,jpeg,gif,svg}'],
            dest: '<%= local %>/assets/images/ %>'
          }
        ]
      }
    },

    sass: {
      all: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= local %>/assets/styles/style.css': '<%= local %>/assets/styles/sass/style.scss'
        },
      }
    },


    /*  
    *  Setting up the server, live reloading and opening up the page
    *  Files will be watched for livereload, SASS files will be automatically compiled when changed
    */

    watch: {
      sass: {
        files: [
          '<%= local %>/assets/styles/sass/**/*.{scss,sass}',
          '<%= local %>/assets/styles/sass/_partials/**/*.{scss,sass}'
        ],
        tasks: ['styles']
      }
    },

    connect: {
      server: {
        options: { port: '3000', base: '<%= local %>' }
      }
    },

    open : {
      dev : { path: 'http://127.0.0.1:3000' }
    },



    /*  
    *  Take a quick screenshot at different viewpoints and
    *  save it to timestamped folder
    */

    localscreenshots: {
      options: {
        path: './screenshots/<%= grunt.template.today("mm-dd-yyyy") %>_<%= grunt.template.today("hhMMss") %>',
        type: 'png',
        local : {
          path: '<%= local %>',
          port: 8080
        },
        viewport: ['600x800', '768x1024', '1024x1024'],
      },
      src: ['<%= local %>/*.html']
    },


    /*  
    *  Prompt for git commit message
    *  Use 'git add .' and 'git commit -am' to commit changes
    */
    
    prompt: {
      commit: {
        options: {
          questions: [
            {
              config: 'echo.input',
              type: 'input',
              message: 'Commit Message',
              validate: function(value) {
              if (value === '') {
                return 'A value is required.';
              }
                return true;
              }
            }
          ]
        }
      }
    },

    shell: {
      addall: {
        command: 'git add .',
        options: {
          stdout: true
        }
      },

      commit: {
        command: function() {
                      return ('git commit -am' + grunt.config('echo.input') + ';');
                    },
        options: {
          stdout: true
        }
        }
      },

  })

grunt.registerTask('styles', ['sass'])
grunt.registerTask('git', ['prompt', 'shell'])
grunt.registerTask('server', ['connect', 'open', 'watch'])
grunt.registerTask('screen', ['localscreenshots'])
grunt.registerTask('default', ['imagemin', 'jshint', 'sass', 'localscreenshots', 'prompt', 'shell', 'connect', 'open', 'watch']);

}