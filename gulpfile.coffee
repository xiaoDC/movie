gulp = require 'gulp'

gulp.task 'default', ['copy'], ->

### copy bower_compenets ###
gulp.task 'copy', ['copy-jquery', 'copy-require', 'copy-bootstrap'], ->
    copy = require 'gulp-copy'
    gulp.src './bower_components/requirejs/require.js'
    .pipe copy './build/js/', {
        prefix: 2
    }

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


