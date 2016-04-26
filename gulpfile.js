'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build-js', () => {
    return gulp
        .src('src/js/**/*.js')
        .pipe(babel({
            plugins: ["transform-es2015-modules-commonjs"],
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/scripts-primitive'));
});

gulp.task('browserify', () => {
    let bundleStream = browserify('public/scripts-primitive/app.js').bundle();
    bundleStream
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/scripts'))
});

gulp.task('default', ['build-js', 'browserify']);
