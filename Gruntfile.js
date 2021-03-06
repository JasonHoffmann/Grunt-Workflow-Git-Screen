module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({

    /* Set this to the relative path of your project's index.html file */
    local: 'src',
    dest: 'build',

    pkg: grunt.file.readJSON('package.json'),


    /*  
    *  Basic Compression and Minificaiton, Image Optimization and SASS and Scripts concatenation
    */

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          caseSensitive: true
        },
      expand: true,
      cwd: '<%= local %>/',
      src: ['*.html'],
      dest: '<%= dest %>/'
      }
    },

    concat: {
      dist: {
        src: [
          '<%= local %>/assets/scripts/vendor/*.js',
          '<%= local %>/assets/scripts/*.js'
        ],
        dest: '<%= dest %>/js/app.js',
      }
    },

    uglify: {
      build: {
        src: '<%= dest %>/js/app.js',
        dest: '<%= dest %>/js/app.min.js'
      }
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
            cwd: '<%= dest %>/images/ %>',
            src: ['**/*.{png,jpg,jpeg,gif,svg}'],
            dest: '<%= dest %>/images/ %>'
          }
        ]
      }
    },

    copy: {
      images: {
        files: [
        {expand: true, cwd: '<%= local %>/assets/images', src: ['**'], dest: '<%= dest %>/images/'}
        ]
      }
    },

    sass: {
      all: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dest %>/styles/style.css': '<%= local %>/assets/styles/style.scss'
        },
      }
    },

    autoprefixer: {
      file: {
        src: '<%= dest %>/styles/style.css'
      },
    },


    /*  
    *  Setting up the server, live reloading and opening up the page
    *  Files will be watched for livereload, SASS files will be automatically compiled when changed, as will scripts and HTML
    */

    watch: {
      
      options: {
        livereload: true
      },
      scripts: {
        files: ['<%= local %>/assets/scripts/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        }
      },

      css: {
        files: ['<%= local %>/assets/styles/sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false,
        }
      },

      html: {
        files: ['<%= local %>/*.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      },

      images: {
        files: ['<%= local %>/assets/images/*.{png,jpg,jpeg,gif,svg}'],
        tasks: ['copy', 'imagemin'],
        options: {
          spawn: false
        }
      }

    },



    connect: {
      server: {
        options: { port: '3000', base: '<%= dest %>' }
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
      src: ['<%= dest %>/*.html']
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
                config: 'gitmessage',
                type: 'input',
                message: 'Commit Message'
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
            var message = grunt.config('gitmessage');
            return "git commit -am '" + message + "'";
          },
          options: {
            stdout: true
          }
        }
      },

    })

grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-open');

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');

grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-prompt');
grunt.loadNpmTasks('grunt-localscreenshots');


grunt.registerTask('styles', ['sass'])
grunt.registerTask('git', ['prompt', 'shell'])
grunt.registerTask('server', ['connect', 'open', 'watch'])
grunt.registerTask('screen', ['localscreenshots'])
grunt.registerTask('default', ['copy', 'imagemin', 'jshint', 'sass', 'localscreenshots', 'prompt', 'shell', 'connect', 'open', 'watch']);

}