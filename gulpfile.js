'use strict';

var metal = require('gulp-metal');
var path = require('path');

metal.registerTasks({
	buildSrc: ['src/**/*.js'],
	cssSrc: ['src/**/*.css'],
	scssSrc: ['src/**/*.scss'],
	soySrc: ['src/**/*.soy'],
	bundleCssFileName: 'metalNeo4j.css',
	bundleFileName: 'metalNeo4j.js',
	moduleName: 'metal-metalNeo4j'
});
