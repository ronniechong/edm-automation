module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: false
      },
      includePaths: {
				options: {
					includePaths: ['src/core']
        },
			},
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.scss'],
        dest: 'build/',
        ext: '.css'
        
      },
    },
     watch: {
      default: {
        files: ['./src/**/*.scss', './src/**/*.jade', './build/**/*.html'],
        tasks: ['sass', 'newer:jade', 'newer:premailer', 'newer:prettify']
      }
    },
    //Export external CSS and insert into HTML markup as inline CSS
    premailer: {
      options: {
        mode: 'html',
        baseUrl: '',
        queryString: '',
        css: [],
        removeClasses: false,
        removeScripts: true,
        removeComments: false,
        preserveStyles: true,
        lineLength: 65,
        ioException: false,
        verbose: true
      },
      files: {
        expand: true,
        src: ['./build/**/*.html', '!./build/**/*-inline.html'],
        dest: './build/',
        rename: function (dest, src) {
          var folder = src.substring(0, src.lastIndexOf('/')),
            filename = src.substring(src.lastIndexOf('/'), src.length);

          filename = filename.substring(0, filename.lastIndexOf('.'));

          return folder + filename + '-inline.html';
        }
      }
    },
    //Clean up
    prettify: {
      options: {
        "condense": true,
        "preserveBOM": false,
        "indent": 2,
        "indent_char": " ",
        "indent_scripts": "normal",
        "wrap_line_length": 0,
        "brace_style": "collapse",
        "preserve_newlines": false,
        "unformatted": ["a", "code", "pre", "span"]
      },
      all: {
        expand: true,
        ext: '.html',
        cwd: 'build/',
        src: ['**/*.html'],
        dest: 'build/'
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          cwd: "src/",
          src: ["**/*.jade", "!core/**/*.jade"],
          dest: "build/",
          expand: true,
          ext: ".html"
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-premailer');
  grunt.loadNpmTasks('grunt-prettify');

  grunt.registerTask('default', ['watch']);

};
