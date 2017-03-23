'use strict';

if (!config.tasks.css || !config.tasks.iconFont) {
	return false;
}

let iconfont         = require('gulp-iconfont');
let generateIconSass = require('./generateIconSass');
let url              = require('url');

let fontPath = path.join(config.root.base, config.root.dest, config.tasks.iconFont.dest);
let cssPath  = path.join(config.root.base, config.root.dest, config.tasks.css.dest);

let settings = {
	name: config.info.name + ' Icons',
	src: path.join(config.root.base, config.root.src, config.tasks.iconFont.src, getExtensions(config.tasks.iconFont.extensions)),
	dest: path.join(config.root.base, config.root.dest, config.tasks.iconFont.dest),
	sassDest: path.join(config.root.base, config.root.src, config.tasks.iconFont.sassDest),
	template: path.normalize('./gulpfile.js/tasks/iconFont/template.scss'),
	sassOutputName: 'Icons.scss',
	fontPath: url.resolve('.',path.relative(cssPath, fontPath)),
	className: 'ico',
	options: {
		timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
		fontName: 'icoFont',
		prependUnicode: false,
		normalize: true,
		formats: config.tasks.iconFont.formats
	}
};

function iconFont() {
	return gulp.src(settings.src, {since: cache.lastMtime('iconFont')})
		.pipe(plumber(handleErrors))
		.pipe(cache('iconFont'))
		.pipe(iconfont(settings.options))
		.on('glyphs', generateIconSass(settings))
		.pipe(gulp.dest(settings.dest))
		.pipe(size({
			title: 'IconFonts:',
			showFiles: false
		})
	);
}

module.exports = iconFont;
