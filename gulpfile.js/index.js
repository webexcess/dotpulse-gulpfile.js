'use strict';
/*! Version: 3.1.0

	'--b, --beautify' -> Dateien werden 'schön' ausgegeben & nicht minimiert
	'--d, --debug'    -> Dateien werden nicht minimiert & Sourcemaps werden generiert
	'--m, --maps'     -> Sourcemaps werden generiert

	'gulp -T' listet alle verfügbaren Tasks auf
*/

require('./globals');

requireDir('./tasks', {
	recurse: true
});
