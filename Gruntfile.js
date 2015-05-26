module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['build/js/main.js'],
        dest: 'build/js/main.min.js'
      }
    },

    babel: {
      options: {
        sourceMap: true,
        modules: "amd"
      },
      dist: {
        files: [{
          cwd: "js",
          src: "*.js",
          dest: "build/js/ecma5",
          expand:true
        }]
      }
    },

    concat: {
      options: {
        separator: ";\n\n\n",
      },
      dist: {
        src: ['build/js/ecma5/*.js'],
        dest: 'build/js/main.js'
      }
    },

    compass: {
      dev:{
        options:{
          sassDir: ['scss'],
          cssDir: ['css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      },
      compass:{
        files: ['**/*.{scss,sass}'],
        tasks: ['compass:dev']
      }
    }

  });

  // Compass
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Watch for changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['babel', 'compass:dev']);

};