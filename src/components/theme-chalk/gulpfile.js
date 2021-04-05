const gulp = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');

gulp.task('build', (done) => {
  gulp.src('./*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
  done();
});
