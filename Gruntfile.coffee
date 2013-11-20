module.exports = (grunt)->
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    concat:
      typesc:
        src: ['src/**/*.js']
        dest: 'public/app.js'

      options:
        separator: ';'

    typescript:
      base:
        src: ['src/**/*.ts']

    compass:
      dist:
        options:
          config: 'config.rb'

    watch:
      ts:
        files: ['src/**/*.ts']
        tasks: ['typescript', 'concat', 'clean']
        options:
          atBegin: true

      css:
        files: ['sass/**/*.scss']
        tasks: ['compass']
        options:
          atBegin: true

    clean: ['src/**/*.js']

  })

  grunt.loadNpmTasks('grunt-typescript')
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('default', ['typescript', 'concat', 'clean', 'compass'])
