const gulp = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('build', (done) => {
  gulp.src('./*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'not dead'],
    }))
    .pipe(gulp.dest('./lib'));
  done();
});
