'use strict';

if (!config.tasks.jsLint) {
	return false;
}


let func = require('../functions');
let jshint = require('gulp-jshint');
let eslint = require('gulp-eslint');
let filesToWatch = func.getFilesToWatch('js');

function jsLint() {
	return gulp.src(filesToWatch, {since: gulp.lastRun('jsLint')})
		.pipe(plumber(handleErrors))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', { verbose: true }));
}

function esLint(argument) {
	return gulp.src(filesToWatch, {since: gulp.lastRun('jsLint')})
		.pipe(plumber(handleErrors))
		.pipe(eslint())
		.pipe(eslint.results(results => {
			func.notifyText({
				warnings: results.warningCount,
				errors: results.errorCount,
				subtitle: 'ES Lint'
			});
		}))
		.pipe(eslint.format());
}

let exportFunction = config.tasks.js.babel ? esLint : jsLint;

module.exports = exportFunction;
