'use strict';

function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

function mergeDeep(target, source) {
	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach(key => {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		});
	}
	return target;
}

function globalImport(target, module) {
	if (!module) {
		module = target;

		if (target.indexOf('gulp-') === 0) {
			target = target.replace('gulp-', '');
		}
	}
	if (typeof module === 'string' && typeof target === 'string') {
		global[target] = require(module);
	}
}

function getInfoFromComposer(system) {
	try {
		let composer = require('../www/' + system + '/composer.json');
		let author = composer.author ? composer.author : config.info.author;
		if (system && composer.description && composer.homepage) {
			config.root.base = './www/' + system + '/';
			config.info = {
				description: composer.description,
				author: author,
				system: system,
				homepage: composer.homepage
			};
		}
	} catch (error) {}
};

function getTimestamp() {
	let timestamp;
	let now = new Date();
	timestamp  = now.getFullYear().toString();
	timestamp += '-';
	timestamp += (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1).toString();
	timestamp += '-';
	timestamp += (now.getDate() < 10 ? '0' : '') + now.getDate().toString();
	timestamp += ' ';
	timestamp += (now.getHours() < 10 ? '0' : '') + now.getHours().toString();
	timestamp += ':';
	timestamp += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes().toString();
	//timestamp += ':';
	//timestamp += (now.getSeconds() < 10 ? '0' : '') + now.getSeconds().toString();
	return timestamp;
}

function getExtensions(extensions) {
	if (Array.isArray(extensions)) {
		return '/*.' + (extensions.length > 1 ? '{' + extensions.join(',') + '}' : extensions);
	} else {
		return '/*.' + extensions;
	}
}

function mergeConfig(sourceFile) {
	try {
		let newConfig = require('../' + sourceFile);
		if (newConfig && global.config) {
			mergeDeep(global.config, newConfig)
		}
	} catch (error) {
		console.info('No external gulp config loaded.');
	}
}

function shureArray(input) {
	let array = input;
	// Make shure it's an array
	if (typeof input === 'string') {
		array = [input];
	}
	return array;
}

function getFilesToWatch(taskName) {
	let conf         = config.tasks[taskName];
	let watchConfig  = shureArray(config.root.watch);
	let dontWatch    = shureArray(config.root.dontWatch);
	let filesToWatch = [];
	if (conf && watchConfig && watchConfig.length) {
		if (conf.watchOnlySrc) {
			filesToWatch.push(path.join(config.root.base, config.root.src, conf.src, '/**', getExtensions(conf.extensions)));
		} else {
			filesToWatch = watchConfig.map(value => path.join(config.root.base, value, getExtensions(conf.extensions)));
		}

		if (dontWatch && dontWatch.length) {
			dontWatch.forEach(value => {
				if (value) {
					filesToWatch.push('!' + path.join(config.root.base, value, getExtensions(conf.extensions)));
				}
			});
		}

		if (taskName == 'css') {
			watchConfig.forEach(value => {
				filesToWatch.push('!' + path.join(config.root.base, value, '**/_{all,allsub}.scss'));
			});
		}
	}
	return filesToWatch;
}

function pluralize(string, count) {
	if (count > 1) {
		string += 's';
	}
	return string;
}

function notifyText(object) {
	if (object.warning  || object.error || object.warnings  || object.errors) {
		let warning;
		let message = ' found';
		let hasError = (object.error || object.errors) ? true : false;
		let options = {
			title: hasError ? 'Error' : 'Warning',
			icon: hasError ? gulpIcons.error : gulpIcons.warning,
			wait: hasError,
			sound: hasError ? 'Basso' : false
		};

		if (object.warning || object.error && (!object.warnings && !object.errors)) {
			message = 'Some issues found';
		}
		if (object.warnings) {
			warning = pluralize(' warning', object.warnings);
			message = object.warnings + warning + message;
		}
		if (object.errors) {
			let error = pluralize(' error', object.warnings);
			message = object.errors + error + (object.warnings ? ' and ' : '') + message;
		}

		notifier.notify({
			title: options.title,
			subtitle: object.subtitle,
			message: message,
			icon: options.icon,
			wait: options.wait,
			sound: options.sound
		});
	}
}

module.exports = {
	mergeDeep: mergeDeep,
	globalImport: globalImport,
	getInfoFromComposer: getInfoFromComposer,
	getTimestamp: getTimestamp,
	getExtensions: getExtensions,
	mergeConfig: mergeConfig,
	getFilesToWatch: getFilesToWatch,
	pluralize: pluralize,
	notifyText: notifyText
};
