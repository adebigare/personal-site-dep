import babel from 'gulp-babel';
import concat from 'gulp-concat';
import del from 'del';
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import nunjucksRender from 'gulp-nunjucks-render';
import path from 'path';
import fs from 'fs';
import data from 'gulp-data';
import mergeStream from 'merge-stream';

const server = browserSync.create();

const paths = {
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  scss: {
    src: 'src/scss/*.scss',
    dest: 'dist/css/'
  },
  html: {
    src: 'src/html/**/*.+(html|nunjucks|njk)',
    dest: 'dist'
  },
};

const clean = () => del(['dist', '!dist/fonts','!dist/bulma', '!dist/img','!dist/static']);

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    // .pipe(babel())
    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function scss() {
  return gulp.src(paths.scss.src, { sourcemaps: false })
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest(paths.scss.dest));
}

function getData() {
  // console.log(file.path);
  return require('./src/data/global.json');
  // return JSON.parse(fs.readFileSync('./data/' + path.basename(file.path) + '.json'));
}

function nunjucks() {
  return gulp.src(paths.html.src, {sourcemaps: true})
  .pipe(data(getData))
  .pipe(nunjucksRender({
    path: ['src/html']
  }))
  .pipe(gulp.dest(paths.html.dest));
}


function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'dist'
    }
  });
  done();
}

const watch = () => {
    gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
    gulp.watch(paths.html.src, gulp.series(nunjucks, reload));
    gulp.watch(paths.scss.src, gulp.series(scss, reload));
  };

const dev = gulp.series(clean, gulp.parallel(nunjucks,scss,scripts), serve, watch);
export default dev;