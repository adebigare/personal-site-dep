var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var path = require('path');
var fs = require('fs');
var del = require('del');

// TO DO: create config file paths like in Pattern Lab

// refers to my build directory and or files to
// to delete
var toDelete = [
  'dist/**/*.html',
  'dist/**/*.css',
  'dist/**/*.js',
];

// TASKS BEGIN

// deletes files
gulp.task('clean', function() {
  return del(toDelete); // rm -rf
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({match: '*.css'}));
});

gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('nunjucks', function(){
  return gulp.src('./src/html/04-pages/*.+(html|nunjucks)')
    .pipe(data(function() {
      return require('./src/data/global.json');
    }))
    .pipe(nunjucksRender({
      path: 'src/html'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({match: '**/*.html'}));
});

gulp.task('browserSync', function() {
  browserSync.init({
    injectChanges: true,
    watch: true,
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch('./src/scss/**/*.scss ', gulp.parallel('sass'));
  gulp.watch('src/**/*.+(html|nunjucks)', gulp.parallel('nunjucks')).on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js ', gulp.parallel('js')).on('change', browserSync.reload);
});

// ***************************************

// gulp.task('watch', function (){
//   gulp.watch('src/**/*.+(html|nunjucks)', gulp.parallel('nunjucks')).on('change', browserSync.reload);
//   gulp.watch('src/scss/**/*.scss ', gulp.parallel('sass')).on('change', browserSync.reload);
//   gulp.watch('src/js/**/*.js ', gulp.parallel('js')).on('change', browserSync.reload);
// });

// build and compile stuff
gulp.task('build', gulp.series('clean',
  gulp.parallel(
    'sass',
    'nunjucks',
    'js'
  ),
  'browserSync'));

// *******************************************

gulp.task('default', gulp.parallel('build'));
