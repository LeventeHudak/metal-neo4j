/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from MetalNeo4j.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace MetalNeo4j.
 * @public
 */

goog.module('MetalNeo4j.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('nav', null, null,
      'class', 'collapse-basic-search navbar navbar-default navbar-no-collapse',
      'id', 'navbarId');
    ie_open('ul', null, null,
        'class', 'nav navbar-nav');
      ie_open('li');
        ie_open('a', null, null,
            'class', 'control-menu-icon');
          ie_void('img', null, null,
              'height', '26',
              'src', 'https://avatars3.githubusercontent.com/u/201120?v=3&s=200');
        ie_close('a');
      ie_close('li');
      ie_open('li', null, null,
          'class', 'active');
        ie_open('a', null, null,
            'class', 'control-menu-icon',
            'href', '#');
          itext('Metal Neo4j');
        ie_close('a');
      ie_close('li');
      ie_open('li');
        ie_open('a', null, null,
            'class', 'control-menu-icon',
            'data-onclick', opt_data.onInitalizeGraphEventHandler,
            'href', '#');
          ie_void('span', null, null,
              'class', 'icon-download-alt');
        ie_close('a');
      ie_close('li');
    ie_close('ul');
    ie_open('form', null, null,
        'class', 'basic-search input-group');
      ie_open('div', null, null,
          'class', 'input-group-input');
        ie_open('div', null, null,
            'class', 'basic-search-slider');
          ie_open('button', null, null,
              'class', 'basic-search-close btn btn-default',
              'type', 'button');
            ie_void('span', null, null,
                'class', 'icon-remove');
          ie_close('button');
          ie_open('input', null, null,
              'class', 'form-control',
              'placeholder', ' Search...',
              'type', 'text');
          ie_close('input');
        ie_close('div');
      ie_close('div');
      ie_open('div', null, null,
          'class', 'input-group-btn');
        ie_open('button', null, null,
            'class', 'btn btn-default',
            'type', 'submit');
          ie_void('span', null, null,
              'class', 'icon-search');
        ie_close('button');
      ie_close('div');
    ie_close('form');
  ie_close('nav');
  ie_open('div', null, null,
      'class', 'section');
    ie_open('div', null, null,
        'class', 'container-fluid');
      ie_void('div', null, null,
          'id', 'errorId');
      ie_open('div', null, null,
          'class', 'row');
        ie_open('div', null, null,
            'class', 'col-md-4 flex-container');
          var labelList11 = opt_data.labels;
          var labelListLen11 = labelList11.length;
          for (var labelIndex11 = 0; labelIndex11 < labelListLen11; labelIndex11++) {
            var labelData11 = labelList11[labelIndex11];
            ie_open('div', null, null,
                'class', 'text-info bg-default drag-drop-item',
                'data-labelname', labelData11);
              itext((goog.asserts.assert((labelData11) != null), labelData11));
            ie_close('div');
          }
        ie_close('div');
        ie_open('div', null, null,
            'class', 'col-md-4 flex-container');
          var relationList19 = opt_data.relations;
          var relationListLen19 = relationList19.length;
          for (var relationIndex19 = 0; relationIndex19 < relationListLen19; relationIndex19++) {
            var relationData19 = relationList19[relationIndex19];
            ie_open('div', null, null,
                'class', 'text-info bg-default drag-drop-item',
                'data-labelname', relationData19);
              itext((goog.asserts.assert((relationData19) != null), relationData19));
            ie_close('div');
          }
        ie_close('div');
        ie_open('div', null, null,
            'class', 'col-md-4 flex-container');
          var keyList27 = opt_data.keys;
          var keyListLen27 = keyList27.length;
          for (var keyIndex27 = 0; keyIndex27 < keyListLen27; keyIndex27++) {
            var keyData27 = keyList27[keyIndex27];
            ie_open('div', null, null,
                'class', 'text-info bg-default drag-drop-item',
                'data-labelname', keyData27);
              itext((goog.asserts.assert((keyData27) != null), keyData27));
            ie_close('div');
          }
        ie_close('div');
      ie_close('div');
      ie_open('form', null, null,
          'data-onsubmit', opt_data.onSubmitEventHandler,
          'id', 'queryFormId');
        ie_open('div', null, null,
            'id', 'dragDropTargetId',
            'class', 'row drag-drop-target');
          ie_open('a', null, null,
              'data-onclick', opt_data.onSubmitEventHandler,
              'href', '#');
            ie_void('span', null, null,
                'class', 'submit-btn icon-play');
          ie_close('a');
        ie_close('div');
      ie_close('form');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'MetalNeo4j.render';
}

exports.render.params = ["keys","labels","onInitalizeGraphEventHandler","onSubmitEventHandler","relations"];
exports.render.types = {"keys":"any","labels":"any","onInitalizeGraphEventHandler":"any","onSubmitEventHandler":"any","relations":"any"};
templates = exports;
return exports;

});

class MetalNeo4j extends Component {}
Soy.register(MetalNeo4j, templates);
export { MetalNeo4j, templates };
export default templates;
/* jshint ignore:end */
