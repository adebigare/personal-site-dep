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

// TO DO: create config file paths like in Pattern Lab

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('nunjucks', function(){
  return gulp.src('./src/html/02-organisms/.+(html|nunjucks)')
    .pipe(data(function() {
      return require('./src/data/global.json');
    }))
    .pipe(nunjucksRender({
      path: 'src/html'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('build', ['browserSync','sass', 'nunjucks', 'js']);

// ***************************************

gulp.task('watch', ['browserSync', 'nunjucks', 'sass', 'js'], function (){
  gulp.watch('src/**/*.+(html|nunjucks)', ['nunjucks']);
  gulp.watch('src/scss/**/*.scss ', ['sass']);
  gulp.watch('src/js/**/*.js ', ['js']);
  // gulp.watch('src/js/**/*.js', browserSync.reload);
});

// *******************************************

gulp.task('default', ['watch']);
