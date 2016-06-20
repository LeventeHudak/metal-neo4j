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
    ie_void('div', null, null,
        'id', 'graph');
    ie_open('div', null, null,
        'class', 'hide loading-overlay');
      ie_void('div', null, null,
          'class', 'loading-icon linear loading-icon-lg');
    ie_close('div');
    ie_open('div', null, null,
        'id', 'metal-neo4j-main-content',
        'class', 'container-fluid');
      ie_open('div', null, null,
          'class', 'letterpress');
        itext('Neo4j Visual Query Builder');
      ie_close('div');
      ie_open('ul', null, null,
          'class', 'metal-query-history');
        var queryList7 = opt_data.queries;
        var queryListLen7 = queryList7.length;
        for (var queryIndex7 = 0; queryIndex7 < queryListLen7; queryIndex7++) {
          var queryData7 = queryList7[queryIndex7];
          ie_open('li', null, null,
              'class', 'metal-query-history-item');
            itext((goog.asserts.assert((queryData7) != null), queryData7));
          ie_close('li');
        }
      ie_close('ul');
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
              'class', 'metal-graph-entity-list inline-scroller');
            ie_open('li');
              ie_open('p');
                ie_open('label');
                  itext('Labels');
                ie_close('label');
              ie_close('p');
              ie_open('div', null, null,
                  'class', 'flex-container flex-container-margin-bottom');
                var labelList24 = opt_data.labels;
                var labelListLen24 = labelList24.length;
                for (var labelIndex24 = 0; labelIndex24 < labelListLen24; labelIndex24++) {
                  var labelData24 = labelList24[labelIndex24];
                  ie_open('div', null, null,
                      'class', 'drag-drop-item metal-graph-entity',
                      'data-label', labelData24);
                    ie_open('h6');
                      itext((goog.asserts.assert((labelData24) != null), labelData24));
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
                var relationList32 = opt_data.relations;
                var relationListLen32 = relationList32.length;
                for (var relationIndex32 = 0; relationIndex32 < relationListLen32; relationIndex32++) {
                  var relationData32 = relationList32[relationIndex32];
                  ie_open('div', null, null,
                      'class', 'drag-drop-item metal-graph-entity',
                      'data-label', relationData32);
                    ie_open('h5');
                      itext((goog.asserts.assert((relationData32) != null), relationData32));
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
                var keyList40 = opt_data.keys;
                var keyListLen40 = keyList40.length;
                for (var keyIndex40 = 0; keyIndex40 < keyListLen40; keyIndex40++) {
                  var keyData40 = keyList40[keyIndex40];
                  ie_open('div', null, null,
                      'class', 'drag-drop-item metal-graph-entity',
                      'data-label', keyData40);
                    ie_open('h5');
                      itext((goog.asserts.assert((keyData40) != null), keyData40));
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
          var queryLabelList52 = opt_data.queryLabels;
          var queryLabelListLen52 = queryLabelList52.length;
          for (var queryLabelIndex52 = 0; queryLabelIndex52 < queryLabelListLen52; queryLabelIndex52++) {
            var queryLabelData52 = queryLabelList52[queryLabelIndex52];
            $templateAlias1({id: queryLabelData52.id, label: queryLabelData52.labelName, left: queryLabelData52.left, top: queryLabelData52.top, properties: queryLabelData52.properties}, null, opt_ijData);
          }
          var queryRelationList59 = opt_data.queryRelations;
          var queryRelationListLen59 = queryRelationList59.length;
          for (var queryRelationIndex59 = 0; queryRelationIndex59 < queryRelationListLen59; queryRelationIndex59++) {
            var queryRelationData59 = queryRelationList59[queryRelationIndex59];
            $templateAlias2({id: queryRelationData59.id, label: queryRelationData59.labelName, left: queryRelationData59.left, top: queryRelationData59.top}, null, opt_ijData);
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

exports.render.params = ["keys","labels","onClearQueryBoardEventHandler","onInitalizeGraphEventHandler","onSubmitEventHandler","relations","queryLabels","queryRelations","queries"];
exports.render.types = {"keys":"any","labels":"any","onClearQueryBoardEventHandler":"any","onInitalizeGraphEventHandler":"any","onSubmitEventHandler":"any","relations":"any","queryLabels":"any","queryRelations":"any","queries":"any"};
templates = exports;
return exports;

});

class MetalNeo4j extends Component {}
Soy.register(MetalNeo4j, templates);
export { MetalNeo4j, templates };
export default templates;
/* jshint ignore:end */
