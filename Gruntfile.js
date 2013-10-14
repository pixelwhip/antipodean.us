/*
 * Generated on 2013-09-08
 * generator-assemble 0.3.9
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2013 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'src/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// 'src/templates/pages/**/*.hbs'

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
      app: 'src',
      dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    yeoman: yeomanConfig,

    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      maps: {
        files: [
          '<%= yeoman.app %>/maps/*.kml'
        ],
        tasks: ['copy:maps']
      },
      scripts: {
        files: [
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          '<%= yeoman.app %>/scripts/**/*.png'
        ],
        tasks: ['copy:scripts']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      assemble: {
        files: [
          '<%= yeoman.app %>/**/*.{hbs,json,yml,md}',
          '<%= yeoman.app %>/helpers/**/*.js'
        ],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.dist %>/*.html',
          '<%= yeoman.dist %>/assets/styles/{,*/}*.css',
          '<%= yeoman.dist %>/assets/scripts/{,*/}*.js',
        ]
      }
    },
    connect: {
      options: {
        port: 9001,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'antipodean.loc'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'dist'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    assemble: {
      options: {
        flatten: true,
        assets: 'dist/assets',
        data: 'src/data/*.{json,yml}',
        engine: 'handlebars',
        helpers: ['src/helpers/**/*.js' ],
        layoutdir: 'src/templates/layouts/',
        layout: 'default.hbs',
        partials: 'src/templates/partials/*.hbs'
      },
      posts: {
        options: {
          ext: '.html',
          layout: 'post.hbs'
        },
        files: {
          'dist/': ['src/templates/pages/*.hbs'],
          'dist/posts/': ['src/content/*.md']
        }
      }
    },
    image_profile: {
      options: {},

      location: {
        options: {
          exif: {
            'GPSLatitude': '60/1, 192322/10000, 0/1',
            'GPSLatitudeRef': 'N',
            'GPSLongitude': '24/1, 26125/10000, 0/1',
            'GPSLongitudeRef': 'E'
          }
        },
        src: ['src/images/*.jpg']
      },

      save_profiles: {
        options: {
          save: [
            'xmp',
            'iptc'
          ]
        },
        files: {
          'dist/profiles': ['src/images/*.jpg']
        }
      }
    },
    open: {
      server: {
        path: 'http://antipodean.loc:<%= connect.options.port %>'
      }
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        'dist/**/*.{html,xml,md}',
        '.tmp'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.dist %>/assets/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        require: 'breakpoint',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        bundleExec: true
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'images/{,*/}*.{webp,gif}',
              'styles/fonts/{,*/}*.*'
            ]
        }]
      },
      scripts: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/scripts',
        dest: '<%= yeoman.dist %>/assets/scripts/',
        src: '**/*.{js,png}'
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '<%= yeoman.dist %>/assets/styles/',
        src: '{,*/}*.css'
      },
      images: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/images',
        dest: '<%= yeoman.dist %>/assets/images/',
        src: '{,*/}*.{jpg,svg,png}'
      },
      maps: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/maps',
        dest: '<%= yeoman.dist %>/assets/maps/',
        src: '{,*/}*.kml'
      }
    },
    concurrent: {
      server: [
        'compass',
        'copy:scripts',
        'copy:styles',
        'copy:images',
        'copy:maps'
      ],
      test: [
        'copy:scripts',
        'copy:styles'
      ],
      dist: [
        'compass',
        'copy:scripts',
        'copy:styles',
        // 'imagemin',
        // 'svgmin',
        // 'htmlmin'
      ]
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  });
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('assemble');
  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'assemble',
      'open',
      'watch'
    ]);
  });
};
