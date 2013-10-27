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
  require('./config');

  // configurable paths
  var yeomanConfig = {
      app: 'src',
      dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    yeoman: yeomanConfig,
    flickr: {
      tasks: ['flickr']
    },
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
        // hostname: 'antipodean.loc'
        hostname: '0.0.0.0'
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
        collections: [
          {
            name: 'regions',
            inflection: 'region',
            sortorder: 'ascending', // or any of the following ['asc', 'desc', 'descending'] upper or lower case
            sortby: 'title'
          }
        ],
        data: 'src/data/*.{json,yml}',
        engine: 'handlebars',
        helpers: ['src/helpers/**/*.js' ],
        layoutdir: 'src/templates/layouts/',
        layout: 'default.hbs',
        partials: 'src/templates/partials/*.hbs',
        plugins: ['permalinks'],
        permalinks: {
          structure: ':slug/:basename/index.html'
        }
      },
      regions: {
        options: {
          ext: '.html',
          layout: 'post.hbs',
          expand: true
        },
        files: [
          {
            dest: 'dist/',
            src: 'src/templates/pages/*.hbs',
            layout: 'default.hbs'
          },
          {
            layout: 'region.hbs',
            expand: true,
            dest: 'dist/',
            src: 'src/content/regions/*.md',
            rename: function(dest, src){
              return dest + '/index.html';
            }
          },
          {
            expand: true,
            dest: 'dist',
            src: 'src/content/posts/**/*.md',
            rename: function(dest, src){
              return dest + '/index.html';
            }
          },
        ]
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
              'styles/fonts/{,*/}*.*',
              '**/CNAME'
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
  grunt.loadNpmTasks('grunt-contrib-flickr');
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
