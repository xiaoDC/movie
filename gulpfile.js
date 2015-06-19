var gulp;

gulp = require('gulp');

gulp.task('default', ['copy', 'coffee'], function() {});


/* gulp 调用命令行来运行该项目程序 */

gulp.task('server', ['copy', 'coffee'], function(cb) {
  var exec;
  exec = require('child_process').exec;
  return exec('supervisor app.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


/* gulp 调用命令行来运行该项目程序 */

gulp.task('mongo', function(cb) {
  var exec;
  exec = require('child_process').exec;
  return exec('mongod --dbpath ~/mongodb/', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


/* copy bower_compenets */

gulp.task('copy', ['copy-jquery', 'copy-require', 'copy-bootstrap'], function() {
  var copy;
  copy = require('gulp-copy');
  return gulp.src('./bower_components/requirejs/require.js').pipe(copy('./build/js/', {
    prefix: 2
  }));
});


/* compile *.coffee */

gulp.task('compile_all_coffee', function() {
  var coffee;
  coffee = require('gulp-coffee');
  return gulp.src('./**/*.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest(''));
});


/* compile *.coffee */

gulp.task('coffee', ['compile_all_coffee'], function() {
  var coffee;
  coffee = require('gulp-coffee');
  return gulp.src('./.coffee').pipe(coffee({
    bare: true
  })).pipe(gulp.dest(''));
});


/* copy requirejs */

gulp.task('copy-jquery', function() {
  var copy;
  copy = require('gulp-copy');
  return gulp.src('./bower_components/jquery/dist/jquery.js').pipe(copy('./build/js/', {
    prefix: 3
  }));
});


/* copy requirejs */

gulp.task('copy-require', function() {
  var copy;
  copy = require('gulp-copy');
  return gulp.src('./bower_components/requirejs/require.js').pipe(copy('./build/js/', {
    prefix: 2
  }));
});


/* copy requirejs */

gulp.task('copy-bootstrap', function() {
  var copy;
  copy = require('gulp-copy');
  return gulp.src('./bower_components/bootstrap/dist/**/*').pipe(copy('./build/bootstrap/', {
    prefix: 3
  }));
});
