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
  ie_open('div', null, null,
      'class', 'metal-neo4j');
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
                'class', 'icon-tasks icon-large');
          ie_close('a');
        ie_close('li');
        ie_open('li');
          ie_open('a', null, null,
              'class', 'control-menu-icon',
              'data-onclick', opt_data.onClearQueryBoardEventHandler,
              'href', '#');
            ie_void('span', null, null,
                'class', 'icon-refresh icon-large');
          ie_close('a');
        ie_close('li');
        ie_open('li');
          ie_open('a', null, null,
              'data-onclick', opt_data.onSubmitEventHandler,
              'href', '#');
            ie_void('span', null, null,
                'class', 'icon-bolt icon-large');
          ie_close('a');
        ie_close('li');
      ie_close('ul');
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
            var labelList15 = opt_data.labels;
            var labelListLen15 = labelList15.length;
            for (var labelIndex15 = 0; labelIndex15 < labelListLen15; labelIndex15++) {
              var labelData15 = labelList15[labelIndex15];
              ie_open('div', null, null,
                  'class', 'card card-rounded drag-drop-item graph-element-card',
                  'data-label', labelData15);
                ie_open('div', null, null,
                    'class', 'card-row card-row-padded card-row-valign-top');
                  ie_open('h4');
                    itext((goog.asserts.assert((labelData15) != null), labelData15));
                  ie_close('h4');
                ie_close('div');
              ie_close('div');
            }
          ie_close('div');
          ie_open('div', null, null,
              'class', 'col-md-4 flex-container');
            var relationList23 = opt_data.relations;
            var relationListLen23 = relationList23.length;
            for (var relationIndex23 = 0; relationIndex23 < relationListLen23; relationIndex23++) {
              var relationData23 = relationList23[relationIndex23];
              ie_open('div', null, null,
                  'class', 'card card-rounded drag-drop-item graph-element-card',
                  'data-label', relationData23);
                ie_open('div', null, null,
                    'class', 'card-row card-row-padded card-row-valign-top');
                  ie_open('h4');
                    itext((goog.asserts.assert((relationData23) != null), relationData23));
                  ie_close('h4');
                ie_close('div');
              ie_close('div');
            }
          ie_close('div');
          ie_open('div', null, null,
              'class', 'col-md-4 flex-container');
            var keyList31 = opt_data.keys;
            var keyListLen31 = keyList31.length;
            for (var keyIndex31 = 0; keyIndex31 < keyListLen31; keyIndex31++) {
              var keyData31 = keyList31[keyIndex31];
              ie_open('div', null, null,
                  'class', 'card card-rounded drag-drop-item graph-element-card',
                  'data-label', keyData31);
                ie_open('div', null, null,
                    'class', 'card-row card-row-padded card-row-valign-top');
                  ie_open('h4');
                    itext((goog.asserts.assert((keyData31) != null), keyData31));
                  ie_close('h4');
                ie_close('div');
              ie_close('div');
            }
          ie_close('div');
        ie_close('div');
        ie_open('form', null, null,
            'data-onsubmit', opt_data.onSubmitEventHandler,
            'id', 'queryFormId');
          ie_void('div', null, null,
              'id', 'dragDropTargetId',
              'class', 'row drag-drop-target');
        ie_close('form');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'MetalNeo4j.render';
}

exports.render.params = ["keys","labels","onClearQueryBoardEventHandler","onInitalizeGraphEventHandler","onSubmitEventHandler","relations"];
exports.render.types = {"keys":"any","labels":"any","onClearQueryBoardEventHandler":"any","onInitalizeGraphEventHandler":"any","onSubmitEventHandler":"any","relations":"any"};
templates = exports;
return exports;

});

class MetalNeo4j extends Component {}
Soy.register(MetalNeo4j, templates);
export { MetalNeo4j, templates };
export default templates;
/* jshint ignore:end */
