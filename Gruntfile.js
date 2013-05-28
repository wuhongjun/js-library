module.exports = function(grunt) {

  // Initializes the Grunt tasks with the following settings
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    transport: {
      options: {
        format: 'cmd/{{filename}}', // id format
      },
      src: {
        files: [{
          cwd: 'src',
          src: '**/*',
          dest: 'cmd'
        }]
      }
    },
    // A list of files, which will be syntax-checked by JSHint
    jshint: {
      all: ['src/*.js']
    },

    // Files to be concatenated … (source and destination files)
    concat: {
      options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> -- <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: ['src/src1.js', 'src/src2.js', 'src/src3.js'],
        dest: 'dist/built.js'
      },
      build: {
        src: ['src/src1.js', 'src/src2.js'],
        dest: 'build/built.js'
      }
    },

    // … and minified (source and destination files)
    uglify: {
      build: {
        files: {
          'dist/*.min.js': ['src/*.js']
        }
      }
    },

    // Tasks being executed with 'grunt watch'
    watch: {
      js: {
        files: 'src/*.js',
        tasks: ['jshint']
      }
    }
  });

  // Load the plugins that provide the tasks we specified in package.json.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // grunt.loadNpmTasks('grunt-cmd-transport');

  // This is the default task being executed if Grunt
  // is called without any further parameter.
  grunt.registerTask('default', ['jshint', 'watch']);

  // grunt.registerTask('build', ['transport']);
};