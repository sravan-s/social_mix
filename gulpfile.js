const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
  scripts: ['src/js/**/*.js']
};

gulp.task('copyjs', () => {
    gulp
        .src(paths.scripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/scripts'));
});
