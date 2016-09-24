// Include gulp
const gulp = require('gulp');

// Include Our Plugins
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

// Watch Files For Changes
gulp.task('watch', () => {
  gulp.watch('./apiscript/*', ['apiscript']);
});

// Default Task
gulp.task('default', ['apiscript']);

