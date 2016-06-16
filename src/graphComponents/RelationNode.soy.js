/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from RelationNode.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace RelationNode.
 * @public
 */

goog.module('RelationNode.incrementaldom');

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
  opt_data = opt_data || {};
  ie_open('div', null, null,
      'class', 'metal-relation-node card card-rounded query-element-drag',
      'data-id', opt_data.id,
      'data-label', opt_data.label,
      'style', 'position: absolute; left: ' + opt_data.left + 'px; top: ' + opt_data.top + 'px;');
    ie_open('h3', null, null,
        'class', 'handle');
      itext((goog.asserts.assert((opt_data.label) != null), opt_data.label));
    ie_close('h3');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'RelationNode.render';
}

exports.render.params = ["id","label","left","top"];
exports.render.types = {"id":"any","label":"any","left":"any","top":"any"};
templates = exports;
return exports;

});

class RelationNode extends Component {}
Soy.register(RelationNode, templates);
export { RelationNode, templates };
export default templates;
/* jshint ignore:end */
