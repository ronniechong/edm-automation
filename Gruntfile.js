module.exports = function(grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        compass: {                  
            dist: {                  
              options: {              
                sassDir: 'src/',
                cssDir: 'build/',
                environment: 'development'
              }
            }
        },

        watch: {
             default: {
                 files: ['./src/**/*.scss', './src/**/*.jade','./build/**/*.html'],
                 tasks: ['compass', 'newer:jade', 'newer:premailer','newer:prettify']
             }
        },
        //Export external CSS and insert into HTML markup as inline CSS
        premailer: {
            options: {
                mode           : 'html',
                baseUrl        : '',
                queryString    : '',
                css            : [],
                removeClasses  : false,
                removeScripts  : true,
                removeComments : true,
                preserveStyles : false,
                lineLength     : 65,
                ioException    : false,
                verbose        : true
            },
            files: {
                expand : true,
                src    : ['./build/**/*.html', '!./build/**/*-inline.html'],
                dest   : './build/',
                rename : function(dest, src) {
                    var folder   = src.substring(0, src.lastIndexOf('/')),
                        filename = src.substring(src.lastIndexOf('/'), src.length);                   

                    filename  = filename.substring(0, filename.lastIndexOf('.'));

                    return folder + filename + '-inline.html';
                }
            }
        },
        //Clean up
        prettify: {
            options: {
                "condense"              : true,
                "preserveBOM"           : false,
                "indent"                : 4,
                "indent_char"           : " ",
                "indent_scripts"        : "normal",
                "wrap_line_length"      : 0,
                "brace_style"           : "collapse",
                "preserve_newlines"     : false,
                "unformatted"           : ["a","code","pre","span"]
            },
            all: {
                expand : true,
                ext    : '.html',
                cwd    : 'build/',
                src    : ['**/*.html'],
                dest   : 'build/'
            }
        },

        jade: {
          compile: {
            options: {
              pretty:true,
              data: {
                debug: false
              }
            },
            files: [ {
                  cwd: "src/",
                  src: ["**/*.jade", "!core/**/*.jade"],
                  dest: "build/",
                  expand:true,
                  ext: ".html"
                }]
          }
        }
 
    });
 
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-prettify');

    grunt.registerTask('default',['watch']);
 
};
