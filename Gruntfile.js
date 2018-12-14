/*jshint node:true*/

'use strict';

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks listed in package.json automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
        command: 'bundle exec jekyll build'
      },
      jekyllServe: {
        command: "bundle exec jekyll serve --baseurl ''"
      },
      spellCheck: {
        command: "mdspell -r -n -a --en-us **/*.md"
      },
      linkChecker: {
        command: "blc https://federalist-proxy.app.cloud.gov/site/usajobs/openopps-help/ -e -r"
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        success: false // whether successful grunt executions should be notified automatically
      }
    },
    scsslint: {
      options: {
        bundleExec: true
      },
      dist: {
        src: [
          '_sass/*.scss'
        ]
      }
    },
    htmllint: {
      all: {
        options: {
          errorlevels: ['error'],
          ignore: [
            'Attribute “⚡” not allowed on element “html” at this point.',
            'Element “img” is missing required attribute “src”.',
            'Attribute “amp-custom” not allowed on element “style” at this point.',
            'Attribute “amp-boilerplate” not allowed on element “style” at this point.'
          ]
        },
        src: [ '_dist/**/*.html' ]
      }
    }
  });

  grunt.registerTask('serve', ['shell:jekyllServe']);
  grunt.registerTask('build', ['shell:jekyllBuild']);
  grunt.registerTask('lint', ['scsslint']);
  grunt.registerTask('test', ['shell:spellCheck', 'htmllint', 'shell:linkChecker']);
};
