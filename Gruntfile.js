module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    sled: grunt.file.readJSON('package.json'),
    pkg: grunt.file.readJSON('package.json'),
    project: {
      app: 'sandbox_angular',
      localVersion: '1.0.0',
      cssDir: 'css',
      sassDir: 'sass',
      jsDir: 'js',
      tmpDir: 'tmp',
      vendorDir: 'vendor',
      developmentFiles: [
        'config.js',
        '**/module.js',
        '**/*.svc.js',
        '**/*.ctrl.js',
        '**/*.drtv.js',
        '!<%= project.tmpDir %>/**/module.js',
        '!<%= project.tmpDir %>/**/*.drtv.js',
        '!<%= project.tmpDir %>/**/*.svc.js',
        '!<%= project.tmpDir %>/**/*.ctrl.js',
      ],
      partialTemplateFiles: [
        'app/modal/templates/*.html'
      ],
      vendorJSFiles: [
        '<%= project.vendorDir %>/jquery/dist/jquery.js',
        '<%= project.vendorDir %>/angular/angular.js',
        '<%= project.vendorDir %>/slick-carousel/slick/slick.js',
        '<%= project.vendorDir %>/angular-slick/dist/slick.js',
        '<%= project.vendorDir %>/angular-bootstrap/ui-bootstrap-tpls.js',
        '<%= project.vendorDir %>/angular-bootstrap/ui-bootstrap.js',
        '<%= project.vendorDir %>/angular-resource/angular-resource.js',
        '<%= project.vendorDir %>/angular-ui-router/release/angular-ui-router.js',
      ],
      vendorJSFilesForTesting: [
        '<%= project.vendorDir %>/angular-mocks/angular-mocks.js'
      ],
    },

    sass: {
      compact: {
        options: {
          style: 'compact',
          lineNumbers: false,
          compass: false,
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: '<%= project.sassDir %>',
          src: ['*.scss'],
          dest: '<%= project.cssDir %>',
          ext: '.css'
        }]
      },

      compressed: {
        options: {
          style: 'compact',
          lineNumbers: false,
          compass: false,
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: '<%= project.sassDir %>',
          src: ['*.scss'],
          dest: '<%= project.distCssDir %>',
          ext: '.min.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      no_dest_multiple: {
          src: '<%= project.cssDir %>/*.css',
      }
    },

    html2js: {
      options: {
        base: 'app',
        useStrict: false,
        rename: function (moduleName) {
          return moduleName.replace('.tmpl.html', '.html');
        }
      },
      modal: {
        src: ['<%= project.partialTemplateFiles %>'],
        dest: 'app/modal/modal-templates.js'
      },
    },

    ngAnnotate: {
      options: {
      },
      prod: {
        files: [
        {
          expand: true,
          src: ['<%= project.developmentFiles %>'],
          dest: '<%= project.tmpDir %>'
        }
        ]
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/* <%= project.app %> - <%= sled.version %> */\n',
      },
      prod:{
          src: [
            '<%= project.tmpDir %>/templates.js',
            '<%= project.tmpDir %>/modal.js',
            '<%= project.tmpDir %>/config.js',
            '<%= project.tmpDir %>/**/module.js',
            '<%= project.tmpDir %>/**/*.svc.js',
            '<%= project.tmpDir %>/**/*.ctrl.js',
            '<%= project.tmpDir %>/**/*.drtv.js'
          ],
          dest: '<%= project.tmpDir %>/modal_concat.js'
      }
    },

    uglify: {
      prod: {
        options: {
          stripBanners: true,
          banner: '/* <%= project.app %> - <%= sled.version %> */\n'
        },
        files: [
          {
            src: '<%= project.tmpDir %>/modal_concat.js',
            dest: '<%= project.distJsDir %>/modal.min.js',
          },
          {
            src: 'config.js',
            dest: 'config.js',
          }
        ]
      }
    },

    // ngconstant: {
    //   options: {
    //     space: ' ',
    //     wrap: false,
    //     name: 'modal.config',
    //     dest: './config.js'
    //   },
    //   dev: {
    //     constants: {
    //       myTeamConfig: {
    //         myTeamURL: '/frontend/app/myTeam/',
    //         currentDetailLimit: 10,
    //         slide_showing: 5
    //       }
    //     }
    //   },
    //   prod: {
    //     constants: {
    //       myTeamConfig: {
    //         myTeamURL: '',
    //         currentDetailLimit: 10,
    //         slide_showing: 5
    //       }
    //     }
    //   }
    // },

    // preprocess: {
    //   devIndex: {
    //     options: {
    //       context: {
    //         ENV: 'dev'
    //       }
    //     },
    //     src: 'myTeam.tmpl.html',
    //     dest: '<%= project.distTemplateDir %>/myTeam.html'
    //   },
    //   prodIndex: {
    //     options: {
    //       context: {
    //         ENV: 'prod'
    //       }
    //     },
    //     src: 'myTeam.tmpl.html',
    //     dest: '<%= project.distTemplateDir %>/myTeam.html'
    //   },
    //   prodPartials: {
    //     options: {
    //       context: {
    //         ENV: 'prod',
    //         SRC_URL_PARTIAL: 'members/partials/',
    //         SRC_URL: 'members/'
    //       }
    //     },
    //     src: '**/*.tmpl.html',
    //     ext: '.html',
    //     cwd: '<%= project.templateBuildDir %>',
    //     dest: '<%= project.templateBuildDir %>',
    //     expand: true,
    //   }
    // },

    clean: {
      prod: ['<%= project.tmpDir %>']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      development: {
        options: {
          files: [
            '<%= project.vendorJSFiles %>',
            '<%= project.vendorJSFilesForTesting %>',
            '<%= project.developmentFiles %>',
            '<%= project.developmentFileSpecs %>'
          ]
        }
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: '<%= project.sassDir %>/*.scss',
        tasks: ['sass:compact', 'autoprefixer']
      },
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-html2js');

  // Register tasks
  grunt.registerTask('build:dev', ['sass:compact', 'autoprefixer', 'ngconstant:dev', 'preprocess:devIndex']);
  grunt.registerTask('build:prod', ['sass:compressed', 'autoprefixer', 'html2js:prod']);

  grunt.registerTask('test', ['build:dev', 'karma:development']);
  grunt.registerTask('default', ['watch']);
};
