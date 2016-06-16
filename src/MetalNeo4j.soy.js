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

var $templateAlias1 = Soy.getTemplate('LabelNode.incrementaldom', 'render');

var $templateAlias2 = Soy.getTemplate('RelationNode.incrementaldom', 'render');


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
    ie_open('div', null, null,
        'class', 'container-fluid');
      ie_open('div', null, null,
          'class', 'letterpress');
        itext('Neo4j Visual Query Builder');
      ie_close('div');
      ie_void('div', null, null,
          'id', 'errorId');
      ie_open('div', null, null,
          'class', 'metal-graph-entity-container');
        ie_open('h3', null, null,
            'class', 'handle flex-container metal-toolbox');
          itext('Toolbox');
        ie_close('h3');
        ie_open('hr', null, null,
            'class', 'metal-hr');
        ie_close('hr');
        ie_open('p');
          ie_open('label');
            itext('Controls');
          ie_close('label');
        ie_close('p');
        ie_open('div', null, null,
            'class', 'flex-container flex-container-margin-bottom');
          ie_open('a', null, null,
              'class', 'control-menu-icon',
              'data-onclick', opt_data.onInitalizeGraphEventHandler,
              'href', '#');
            ie_void('span', null, null,
                'class', 'icon-tasks icon-large');
          ie_close('a');
          ie_open('a', null, null,
              'class', 'control-menu-icon',
              'data-onclick', opt_data.onClearQueryBoardEventHandler,
              'href', '#');
            ie_void('span', null, null,
                'class', 'icon-refresh icon-large');
          ie_close('a');
          ie_open('a', null, null,
              'class', 'control-menu-icon',
              'data-onclick', opt_data.onSubmitEventHandler,
              'href', '#');
            ie_void('span', null, null,
                'class', 'icon-play icon-large');
          ie_close('a');
        ie_close('div');
        if (opt_data.labels.length > 0 || opt_data.relations.length > 0 || opt_data.keys.length > 0) {
          ie_open('p');
            ie_open('label');
              itext('Graph entities');
            ie_close('label');
          ie_close('p');
          ie_open('ul', null, null,
              'class', 'metal-graph-entity-list');
            ie_open('li');
              ie_open('p');
                ie_open('label');
                  itext('Labels');
                ie_close('label');
              ie_close('p');
              ie_open('div', null, null,
                  'class', 'flex-container flex-container-margin-bottom');
                var labelList18 = opt_data.labels;
                var labelListLen18 = labelList18.length;
                for (var labelIndex18 = 0; labelIndex18 < labelListLen18; labelIndex18++) {
                  var labelData18 = labelList18[labelIndex18];
                  ie_open('div', null, null,
                      'class', 'drag-drop-item metal-graph-entity',
                      'data-label', labelData18);
                    ie_open('h6');
                      itext((goog.asserts.assert((labelData18) != null), labelData18));
                    ie_close('h6');
                  ie_close('div');
                }
              ie_close('div');
            ie_close('li');
            ie_open('li');
              ie_open('p');
                ie_open('label');
                  itext('Relations');
                ie_close('label');
              ie_close('p');
              ie_open('div', null, null,
                  'class', 'flex-container flex-container-margin-bottom');
                var relationList26 = opt_data.relations;
                var relationListLen26 = relationList26.length;
                for (var relationIndex26 = 0; relationIndex26 < relationListLen26; relationIndex26++) {
                  var relationData26 = relationList26[relationIndex26];
                  ie_open('div', null, null,
                      'class', 'drag-drop-item metal-graph-entity',
                      'data-label', relationData26);
                    ie_open('h5');
                      itext((goog.asserts.assert((relationData26) != null), relationData26));
                    ie_close('h5');
                  ie_close('div');
                }
              ie_close('div');
            ie_close('li');
            ie_open('li');
              ie_open('p');
                ie_open('label');
                  itext('Properties');
                ie_close('label');
              ie_close('p');
              ie_open('div', null, null,
                  'class', 'flex-container');
                var keyList34 = opt_data.keys;
                var keyListLen34 = keyList34.length;
                for (var keyIndex34 = 0; keyIndex34 < keyListLen34; keyIndex34++) {
                  var keyData34 = keyList34[keyIndex34];
                  ie_open('div', null, null,
                      'class', 'drag-drop-item metal-graph-entity',
                      'data-label', keyData34);
                    ie_open('h5');
                      itext((goog.asserts.assert((keyData34) != null), keyData34));
                    ie_close('h5');
                  ie_close('div');
                }
              ie_close('div');
            ie_close('li');
          ie_close('ul');
        }
      ie_close('div');
      ie_open('form', null, null,
          'data-onsubmit', opt_data.onSubmitEventHandler,
          'id', 'queryFormId');
        ie_open('div', null, null,
            'id', 'dragDropTargetId',
            'class', 'row drag-drop-target');
          var queryLabelList46 = opt_data.queryLabels;
          var queryLabelListLen46 = queryLabelList46.length;
          for (var queryLabelIndex46 = 0; queryLabelIndex46 < queryLabelListLen46; queryLabelIndex46++) {
            var queryLabelData46 = queryLabelList46[queryLabelIndex46];
            $templateAlias1({id: queryLabelData46.id, label: queryLabelData46.labelName, left: queryLabelData46.left, top: queryLabelData46.top, properties: queryLabelData46.properties}, null, opt_ijData);
          }
          var queryRelationList53 = opt_data.queryRelations;
          var queryRelationListLen53 = queryRelationList53.length;
          for (var queryRelationIndex53 = 0; queryRelationIndex53 < queryRelationListLen53; queryRelationIndex53++) {
            var queryRelationData53 = queryRelationList53[queryRelationIndex53];
            $templateAlias2({id: queryRelationData53.id, label: queryRelationData53.labelName, left: queryRelationData53.left, top: queryRelationData53.top}, null, opt_ijData);
          }
        ie_close('div');
      ie_close('form');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'MetalNeo4j.render';
}

exports.render.params = ["keys","labels","onClearQueryBoardEventHandler","onInitalizeGraphEventHandler","onSubmitEventHandler","relations","queryLabels","queryRelations"];
exports.render.types = {"keys":"any","labels":"any","onClearQueryBoardEventHandler":"any","onInitalizeGraphEventHandler":"any","onSubmitEventHandler":"any","relations":"any","queryLabels":"any","queryRelations":"any"};
templates = exports;
return exports;

});

class MetalNeo4j extends Component {}
Soy.register(MetalNeo4j, templates);
export { MetalNeo4j, templates };
export default templates;
/* jshint ignore:end */
