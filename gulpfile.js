// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const path = require('path');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const insert = require('gulp-file-insert');


gulp.task('apiscript', () =>
  gulp.src('./apiscript/markup.js')
    .pipe(insert({
      '%HTML%': './apiscript/modal.html',
      '%CSS%': './apiscript/style.css'
    }))
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

