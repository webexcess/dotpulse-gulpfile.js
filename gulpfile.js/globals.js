'use strict';

let func = require('./functions');

func.globalImport('config', './config');
func.globalImport('bach');
func.globalImport('babelify');
func.globalImport('browserify');
func.globalImport('glob');
func.globalImport('gulp');
func.globalImport('notifier', 'node-notifier');
func.globalImport('path');
func.globalImport('requireDir', 'require-dir');
func.globalImport('textTable', 'text-table');
func.globalImport('through2');
func.globalImport('handleErrors', './handleErrors');

// Gulp Plugins
func.globalImport('cache', 'gulp-memory-cache');
func.globalImport('gulp-changed');
func.globalImport('gulp-chmod');
func.globalImport('gulp-flatten');
func.globalImport('gulp-header');
func.globalImport('gulp-imagemin');
func.globalImport('gulp-plumber');
func.globalImport('gulp-rename');
func.globalImport('gulp-size');
func.globalImport('gulp-sourcemaps');
func.globalImport('gulp-uglify');
func.globalImport('gulp-util');
func.globalImport('transform', 'vinyl-transform');


// Import Infos from Neos or Flow Package
func.getInfoFromComposer('Flow');
func.getInfoFromComposer('Neos');

// Overwrite Config with an external file
func.mergeConfig('gulp.json');

const env = util.env;
global.mode = {
	beautify: env.beautify || env.b ? true : false,
	minimize: env.debug  || env.d ? false : true,
	maps: env.maps || env.debug || env.m || env.d ? true : false,
	debug: env.debug || env.d ? true : false
};

global.flags = {
	'--b, --beautify' : ' Beautify and dont\'t compress files',
	'--d, --debug'    : ' Files dont\'t get compressed and sourcemaps get genereated',
	'--m, --maps'     : ' Write sourcemaps',
};

global.gulpIcons = {
	error: path.join(__dirname, 'assets/gulp-error.png'),
	warning: path.join(__dirname, 'assets/gulp-warning.png'),
	normal: path.join(__dirname, 'assets/gulp.png')
};

global.getTimestamp = func.getTimestamp;
global.getExtensions = func.getExtensions;
