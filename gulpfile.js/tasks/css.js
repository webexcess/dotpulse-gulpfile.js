'use strict';

if (!config.tasks.css) {
	return false;
}

let sass         = require('gulp-sass');
let postcss      = require('gulp-postcss');
let beautify     = require('gulp-cssbeautify');
let cssnano      = require('cssnano'); // https://github.com/ben-eb/cssnano
let autoprefixer = require('autoprefixer');

let pc         = config.tasks.css.postcss;
let assetspath = pc.assets.loadPaths;

let assetConf = pc.assets;
if (Array.isArray(assetConf.loadPaths)) {
	assetConf.loadPaths = assetConf.loadPaths.map(value => path.join(config.root.base, config.root.dest, value));
} else {
	assetConf.loadPaths = path.join(config.root.base, config.root.dest, assetConf.loadPaths);
}
assetConf.relative = path.join(config.root.base, config.root.dest, config.tasks.css.dest);

let postScss = [
	require('lost'),                         // https://github.com/peterramsing/lost
	require('postcss-short'),                // https://github.com/jonathantneal/postcss-short
	require('postcss-center')(pc.rucksack),  // https://github.com/jedmao/postcss-center
	require('rucksack-css'),                 // http://simplaio.github.io/rucksack/
	require('postcss-flexbox'),              // https://github.com/archana-s/postcss-flexbox
	require('postcss-assets')(assetConf),    // https://github.com/borodean/postcss-assets
	require('postcss-flexibility'),          // https://github.com/10up/flexibility
	require('pleeease-filters'),             // https://github.com/iamvdo/pleeease-filters
	require('postcss-selector-matches'),     // https://github.com/postcss/postcss-selector-matches
	require('postcss-selector-not'),         // https://github.com/postcss/postcss-selector-not
	require('postcss-pseudoelements'),       // https://github.com/axa-ch/postcss-pseudoelements
	require('postcss-quantity-queries'),     // https://github.com/pascalduez/postcss-quantity-queries
	require('css-mqpacker')(pc.mqpacker),    // https://github.com/hail2u/node-css-mqpacker
	require('postcss-fixes')(pc.fixes)       // https://github.com/MattDiMu/postcss-fixes
];

let paths = {
	src: path.join(config.root.base, config.root.src, config.tasks.css.src, getExtensions(config.tasks.css.extensions)),
	dest: path.join(config.root.base, config.root.dest, config.tasks.css.dest)
};

let saasConfig = config.tasks.css.sass;
saasConfig.imagePath = (config.tasks.css.dest ? '../' : '') + saasConfig.imagePath;

function css() {
	return gulp.src(paths.src, {since: cache.lastMtime('css')})
		.pipe(plumber(handleErrors))
		.pipe(mode.maps ? sourcemaps.init({loadMaps: true}) : util.noop())
		.pipe(sass(saasConfig))
		.pipe(flatten())
		.pipe(postcss(postScss))
		.pipe(mode.minimize ? postcss([cssnano(pc.cssnano)]) : postcss([autoprefixer(pc.cssnano.autoprefixer)]))
		.pipe(mode.beautify ? beautify(config.styles.cssbeautifyOptions) : util.noop())
		.pipe(config.root.inlineAssets ? gulp.dest(path.join(config.root.base, config.root.inlineAssets)) : util.noop())
		.pipe(header(config.banner, {
			info: config.info,
			timestamp: getTimestamp()
		}))
		.pipe(chmod(644))
		.pipe(mode.maps ? sourcemaps.write() : util.noop())
		.pipe(gulp.dest(paths.dest))
		.pipe(size({
			title: 'CSS:',
			showFiles: true
		})
	);
}

module.exports = css;
