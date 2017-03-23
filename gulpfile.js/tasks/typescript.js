'use strict';

if (!config.tasks.typescript) {
	return false;
}

let ts       = require('gulp-typescript');
let tsify    = require('tsify');

let tsProject = ts.createProject('tsconfig.json');

let paths = {
	src: path.join(config.root.base, config.root.src, config.tasks.typescript.src, getExtensions(config.tasks.typescript.extensions)),
	dest: path.join(config.root.base, config.root.dest, config.tasks.typescript.dest),
	entries: []
};

glob(paths.src, (error, files) => {
	paths.entries = files;
});

function typescript() {
	return gulp.src(paths.src, {since: cache.lastMtime('typescript')})
		.pipe(plumber(handleErrors))
		.pipe(through2.obj((file, enc, next) => {
			browserify({
				paths: 'bower_components',
				debug: mode.maps,
				sourceType: 'module',
				basedir: '.',
				entries: paths.entries
			})
			.plugin(tsify, {
				sourceMap: mode.maps
			})
			.transform(babelify)
			.bundle((error, res) => {
				// assumes file.contents is a Buffer
				file.contents = res;
				next(null, file);
			})
		}))
		.pipe(mode.maps ? sourcemaps.init({loadMaps: true}) : util.noop())
		.pipe(rename(path => {
			path.extname = '.js'
		}))
		.pipe(mode.minimize ? uglify({mangle : true}) : util.noop())
		.pipe(config.root.inlineAssets ? gulp.dest(path.join(config.root.base, config.root.inlineAssets)) : util.noop())
		.pipe(header(config.banner, {
			info: config.info,
			timestamp: getTimestamp()
		}))
		.pipe(mode.maps ? sourcemaps.write() : util.noop())
		.pipe(gulp.dest(paths.dest))
		.pipe(size({
			title: 'TypeScript:',
			showFiles: true
		})
	);
}

module.exports = typescript;
