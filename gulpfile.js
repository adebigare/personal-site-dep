var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
// var nunjucks = require('gulp-nunjucks');
var data = require('gulp-data');
var path = require('path');
var fs = require('fs');
var del = require('del');
var watch = require('gulp-watch');

var reload = browserSync.reload;

gulp.task('clean', function(){
  return del(['!dist', 'dist/styles', 'dist/js', 'dist/*.html']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});


gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// gulp.task('nunjucks-precompile', function(){
//   return gulp.src('./src/html/03-templates/*.+(html|nunjucks)')
//     .pipe(nunjucks.precompile())
//     .pipe(gulp.dest('dist'));

// });


gulp.task('nunjucks', function(){
  return gulp.src('./src/html/pages/**/*.+(html|nunjucks)')
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('./src/data/global.json'));
    }))
    .pipe(nunjucksRender({
      path: 'src/html/templates'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

});


gulp.task('watch', function (){
  gulp.watch('html/**/*.+(html|nunjucks)', {cwd: 'src'}, ['nunjucks']);
  gulp.watch('scss/**/*.scss ', {cwd: 'src'}, ['sass']);
  gulp.watch('js/**/*.js ', {cwd: 'src'}, ['js']);
});


gulp.task('build', ['sass', 'nunjucks', 'js']);

// ***************************************



// *******************************************

gulp.task('default', ['serve','watch']);
