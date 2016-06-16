/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from LabelNode.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace LabelNode.
 * @public
 */

goog.module('LabelNode.incrementaldom');

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

var $templateAlias1 = Soy.getTemplate('Modal.incrementaldom', 'render');


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
      'class', 'metal-label-node card card-rounded query-element-drag',
      'data-label', opt_data.label,
      'style', 'position: absolute; left: ' + opt_data.left + 'px; top: ' + opt_data.top + 'px;');
    ie_open('div', null, null,
        'class', 'card-row card-row-padded card-row-valign-top');
      ie_open('h3', null, null,
          'class', 'handle');
        itext((goog.asserts.assert((opt_data.label) != null), opt_data.label));
      ie_close('h3');
    ie_close('div');
    ie_void('div', null, null,
        'class', 'divider');
    ie_open('div', null, null,
        'class', 'inline-scroller');
      var inputList77 = opt_data.inputs;
      var inputListLen77 = inputList77.length;
      for (var inputIndex77 = 0; inputIndex77 < inputListLen77; inputIndex77++) {
        var inputData77 = inputList77[inputIndex77];
        ie_open('div', null, null,
            'class', 'form-group');
          ie_open('label');
            if (inputIndex77 != 0) {
              ie_open('span', null, null,
                  'class', 'relation-color');
                itext((goog.asserts.assert((inputData77.operator) != null), inputData77.operator));
              ie_close('span');
              itext(' ');
            } else {
              itext(' ');
              ie_open('span', null, null,
                  'class', 'relation-color');
                itext('WHERE');
              ie_close('span');
              itext(' ');
            }
            itext((goog.asserts.assert((inputData77.property) != null), inputData77.property));
            itext(' is');
          ie_close('label');
          ie_open('input', null, null,
              'class', 'form-control',
              'type', 'text',
              'placeholder', inputData77.property + '...',
              'data-label', opt_data.label,
              'data-property', inputData77.property,
              'data-operator', inputData77.operator);
          ie_close('input');
        ie_close('div');
      }
      if (opt_data.inputs.length > 0) {
        ie_void('div', null, null,
            'class', 'divider');
      }
      ie_open('button', null, null,
          'class', 'btn btn-block btn-primary btn-sm',
          'type', 'button',
          'data-onclick', opt_data.onShowModalClickEventHandler);
        itext('Add criteria');
      ie_close('button');
      var headerHtml__soy85 = function() {
        ie_open('h4', null, null,
            'class', 'modal-title');
          itext('Add criteria for ');
          itext((goog.asserts.assert((opt_data.label) != null), opt_data.label));
        ie_close('h4');
      };
      var bodyHtml__soy89 = function() {
        ie_open('div', null, null,
            'class', 'styled-select right-margin');
          ie_open('label');
            itext('Relation');
          ie_close('label');
          ie_open('select');
            ie_open('option', null, null,
                'value', 'AND');
              itext('AND');
            ie_close('option');
            ie_open('option', null, null,
                'value', 'OR');
              itext('OR');
            ie_close('option');
          ie_close('select');
        ie_close('div');
        ie_open('div', null, null,
            'class', 'styled-select');
          ie_open('label');
            itext('Property');
          ie_close('label');
          ie_open('select');
            var propertyList96 = opt_data.properties;
            var propertyListLen96 = propertyList96.length;
            for (var propertyIndex96 = 0; propertyIndex96 < propertyListLen96; propertyIndex96++) {
              var propertyData96 = propertyList96[propertyIndex96];
              ie_open('option', null, null,
                  'value', propertyData96);
                itext((goog.asserts.assert((propertyData96) != null), propertyData96));
              ie_close('option');
            }
          ie_close('select');
        ie_close('div');
      };
      var footerHtml__soy99 = function() {
        ie_open('button', null, null,
            'class', 'btn btn-primary',
            'type', 'button',
            'data-onclick', opt_data.onAddCriteriaClickEventHandler);
          itext('Add criteria');
        ie_close('button');
      };
      $templateAlias1({autoFocus: false, elementClasses: 'modal-custom-size', header: headerHtml__soy85, body: bodyHtml__soy89, footer: footerHtml__soy99, visible: false, ref: 'modal'}, null, opt_ijData);
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'LabelNode.render';
}

exports.render.params = ["inputs","label","left","top","onAddCriteriaClickEventHandler","onShowModalClickEventHandler","properties"];
exports.render.types = {"inputs":"any","label":"any","left":"any","top":"any","onAddCriteriaClickEventHandler":"any","onShowModalClickEventHandler":"any","properties":"any"};
templates = exports;
return exports;

});

class LabelNode extends Component {}
Soy.register(LabelNode, templates);
export { LabelNode, templates };
export default templates;
/* jshint ignore:end */
