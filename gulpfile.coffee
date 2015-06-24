gulp = require 'gulp'

gulp.task 'default', ['copy', 'coffee'], ->

### gulp 调用命令行来运行该项目程序 ###
gulp.task 'server', ['copy', 'coffee'], (cb)->
    exec = require('child_process').exec
    exec 'supervisor app.js', (err, stdout, stderr)->
        console.log stdout
        console.log stderr
        cb err
        return

### gulp 调用命令行来运行该项目程序 ###
gulp.task 'mongo', (cb)->
    exec = require('child_process').exec
    exec 'mongod --dbpath ~/mongodb/', (err, stdout, stderr)->
        console.log stdout
        console.log stderr
        cb err
        return

### copy bower_compenets ###
gulp.task 'copy', ['copy-jquery', 'copy-require', 'copy-bootstrap'], ->
    copy = require 'gulp-copy'
    gulp.src './bower_components/requirejs/require.js'
    .pipe copy './build/js/', {
        prefix: 2
    }


### compile *.coffee ###
gulp.task 'compile_all_coffee', ->
    coffee = require 'gulp-coffee'
    gulp.src './**/*.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest ''

### compile *.coffee ###
gulp.task 'coffee', ['compile_all_coffee'], ->
    coffee = require 'gulp-coffee'
    gulp.src './.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest ''


### copy requirejs ###
gulp.task 'copy-jquery', ->
    copy = require 'gulp-copy'
    gulp.src './bower_components/jquery/dist/jquery.js'
    .pipe copy './build/js/', {
        prefix: 3
    }

### copy requirejs ###
gulp.task 'copy-require', ->
    copy = require 'gulp-copy'
    gulp.src './bower_components/requirejs/require.js'
    .pipe copy './build/js/', {
        prefix: 2
    }

### copy requirejs ###
gulp.task 'copy-bootstrap', ->
    copy = require 'gulp-copy'
    gulp.src './bower_components/bootstrap/dist/**/*'
    .pipe copy './build/bootstrap/', {
        prefix: 3
    }


