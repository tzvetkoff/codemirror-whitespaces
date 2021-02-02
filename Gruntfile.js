var sass = require('node-sass');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  var sassCommon;
  var uglifyCommon;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      js: {
        src: ['./src/js/codemirror-whitespaces.js'],
        dest: './dist/codemirror-whitespaces.js'
      }
    },

    sass: {
      common: (sassCommon = {
        src: [
          './src/scss/codemirror-whitespaces.scss'
        ],
        nonull: true,
      }),

      dist: Object.assign({}, sassCommon, {
        dest: './dist/codemirror-whitespaces.min.css',
        options: {
          implementation: sass,
          outputStyle: 'compressed'
        }
      }),

      dev: Object.assign({}, sassCommon, {
        dest: './dist/codemirror-whitespaces.css',
        options: {
          implementation: sass,
          outputStyle: 'expanded'
        }
      })
    },

    uglify: {
      common: (uglifyCommon = {
        src: [
          './src/js/codemirror-whitespaces.js'
        ],
        nonull: true,
      }),

      dist: Object.assign({}, uglifyCommon, {
        dest: './dist/codemirror-whitespaces.min.js',
        options: {
          banner: '/*! Pasteur */ ',
          output: {
            beautify: false
          },
          mangle: true,
          compress: true
        }
      })
    },

    connect: {
      server: {
        options: {
          port: 1337,
          open: true
        }
      }
    },

    watch: {
      options: {
        livereload: 35729
      },
      sass: {
        files: ['./src/**/*.scss'],
        tasks: ['sass:dev']
      },
      js: {
        files: ['./src/**/*.js'],
        tasks: ['copy:js']
      }
    }
  });

  grunt.registerTask('default', ['sass:dev', 'copy:js', 'sass:dist', 'uglify:dist']);
  grunt.registerTask('dev', ['sass:dev', 'copy:js', 'connect', 'watch']);
};
