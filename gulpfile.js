// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const fs = require('fs');
const path = require('path');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const insert = require('gulp-file-insert');
const replace = require('gulp-replace-task');
const minCss = require('gulp-minify-css');
const iife = require('gulp-iife');

gulp.task('apiscript-sass', () =>
    gulp.src('./apiscript/style.scss')
      .pipe(replace({
        patterns: [
          {
            match: /%LOGO_SVG%/,
            replacement: fs.readFileSync('./apiscript/logo.svg', 'utf8')
              .replace(/\n/g, '')
          },
          {
            match: /%LOADING_SVG%/,
            replacement: fs.readFileSync('./apiscript/loading.svg', 'utf8')
              .replace(/\n/g, '')
          },
          {
            match: /%CLOSE_SVG%/,
            replacement: fs.readFileSync('./apiscript/close.svg', 'utf8')
              .replace(/\n/g, '')
          }
        ]
      }))
      .pipe(sass())
      .pipe(minCss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./apiscript')));

gulp.task('apiscript', ['apiscript-sass'], () =>
  gulp.src('./apiscript/markup.js')
    .pipe(iife())
    .pipe(insert({ '%CSS%': './apiscript/style.min.css' }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./apiscript')));

//Compile Sass
gulp.task('sass', () =>
  gulp.src(path.join(__dirname, 'client/src/*.scss'))
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.join(__dirname, 'client/public')))
);

// Watch Files For Changes
gulp.task('watch', () => {
  gulp.watch('./apiscript/*', ['apiscript']);
  gulp.watch(path.join(__dirname, 'client/src/*.scss'), ['sass']);

});

// Default Task
gulp.task('default', ['apiscript', 'sass']);

