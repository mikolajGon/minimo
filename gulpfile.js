'use strict';

var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    gulpSourcemaps = require('gulp-sourcemaps'),
    del = require('del');



gulp.task('compileSass', function() {
    return gulp.src('scss/styles.scss')
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass())
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
    gulp.watch('scss/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
    del(['dist', 'css/styles.css*']);
});

gulp.task('serve', ['watchFiles']);

gulp.task('build', ['compileSass'], function() {
    return gulp.src(['css/styles.css', 'index.html', 'img/**', 'fonts/**'], {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});