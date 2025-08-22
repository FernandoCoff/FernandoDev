const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const terser = require('gulp-terser')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  }
}

function minifyHTML() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream())
}

function compileSass() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

function minifyJS() {
  return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch(paths.html.src, minifyHTML)
  gulp.watch(paths.styles.src, compileSass)
  gulp.watch(paths.scripts.src, minifyJS)
}

const build = gulp.parallel(minifyHTML, compileSass, minifyJS)

exports.minifyHTML = minifyHTML
exports.sass = compileSass
exports.minifyJS = minifyJS
exports.build = build
exports.watch = watchFiles
exports.default = gulp.series(build, watchFiles)
