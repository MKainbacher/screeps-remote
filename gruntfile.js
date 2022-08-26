var path = require('path');

module.exports = function(grunt) {
  var config = require('./.screeps.json');
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.initConfig({
    screeps: {
      options: {
        email: config.email,
        token: config.token,
        branch: config.branch,
        ptr: config.ptr
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.js'],
            flatten: true
          }
        ]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'dist/',
        src: '**/*.js',
        dest: path.normalize(config.pathToLocalFiles),
        flatten: true,
        options: {
          process: function(content, srcpath) {
            if (srcpath.endsWith('.js')) {
              return content.replace(/require\(['"](.+\/)*(.+)['"]\)/g, 'require(\'./$2\')');
            }
            return content;
          }
        }
      }
    }
  });
  grunt.registerTask('default',  ['screeps']);
  grunt.registerTask('private', ['copy']);
};
