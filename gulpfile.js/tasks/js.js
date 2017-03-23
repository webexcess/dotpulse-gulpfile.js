'use strict';

if (!config.tasks.js) {
	return false;
}

let include = require('gulp-include');
let babelConfig = config.tasks.js.babel;
let paths = {
	src: path.join(config.root.base, config.root.src, config.tasks.js.src, getExtensions(config.tasks.js.extensions)),
	dest: path.join(config.root.base, config.root.dest, config.tasks.js.dest),
	include: config.tasks.js.include
};
if (paths.include.includePaths && paths.include.includePaths[0] == '') {
	paths.include.includePaths[0] = path.join(config.root.base, config.root.src);
}

if (babelConfig) {
	if (babelConfig.paths.length && babelConfig.paths[0] == '') {
		babelConfig.paths[0] = path.join(config.root.base, config.root.src);
	}
	if (typeof babelConfig.debug === 'undefined') {
		babelConfig.debug = mode.maps;
	}
}

function js() {
	let babel = () => {
		return through2.obj((file, enc, next) => {
			browserify(file.path, babelConfig)
			.transform(babelify)
			.bundle((error, res) => {
				// assumes file.contents is a Buffer
				file.contents = res;
				next(null, file);
			})
		})
	};

	return gulp.src(paths.src, {since: cache.lastMtime('js')})
		.pipe(plumber(handleErrors))
		.pipe(babelConfig ? babel() : util.noop())
		.pipe(include(paths.include))
		.pipe(mode.maps ? sourcemaps.init({loadMaps: true}) : util.noop())
		.pipe(mode.minimize ? uglify({mangle : true}) : util.noop())
		.pipe(config.root.inlineAssets ? gulp.dest(path.join(config.root.base, config.root.inlineAssets)) : util.noop())
		.pipe(header(config.banner, {
			info: config.info,
			timestamp: getTimestamp()
		}))
		.pipe(mode.maps ? sourcemaps.write() : util.noop())
		.pipe(gulp.dest(paths.dest))
		.pipe(size({
			title: 'JS:',
			showFiles: true
		})
	);
}

module.exports = js;
