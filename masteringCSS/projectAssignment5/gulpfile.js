'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var connect = require('gulp-connect');
var minify = require('gulp-minify');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');

gulp.task('css', function() {
	var plugins = [autoprefixer({ browsers: ['last 2 version'] })];
	return gulp
		.src('styles/*.css')
		.pipe(plumber())
		.pipe(postcss(plugins))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/styles/'));
});

gulp.task('sass', function () {
  return gulp.src('/stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styleSheets'));
});

gulp.task('serve', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('compress', function() {
	gulp
		.src('scripts/*.js')
		.pipe(
			minify({
				exclude: ['scripts/vendor']
			})
		)
		.pipe(gulp.dest('dist/scripts'));
});

