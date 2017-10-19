var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(concat('style.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('nunjucks', function(){
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
        path: ['app/templates']
      }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

gulp.task('build', ['browserSync','sass', 'nunjucks'])

// ***************************************

gulp.task('watch', ['browserSync', 'nunjucks', 'sass'], function (){
  gulp.watch('app/**/*.+(html|nunjucks)', ['nunjucks']); 
  gulp.watch('app/scss/**/*.scss ', ['sass']); 
  // gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// *******************************************

gulp.task('default', ['watch']);
