'use strict';

var metal = require('gulp-metal');
var path = require('path');

metal.registerTasks({
	buildSrc: ['src/**/*.js'],
	// cssSrc: ['src/**/*.css', 'componentSrc/**/*.css'],
	// scssSrc: ['src/**/*.scss', 'componentSrc/**/*.scss'],
	soyDest: function(file) {
		return path.dirname(file.path);
	},
	soySrc: ['src/**/*.soy'],
	bundleCssFileName: 'metalNeo4j.css',
	bundleFileName: 'metalNeo4j.js',
	moduleName: 'metal-metalNeo4j'
});
