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
            'class', 'col-md-12');
          ie_open('form', null, null,
              'data-onsubmit', opt_data.onSubmitEventHandler);
            ie_open('div', null, null,
                'class', 'input-group-default input-group-lg');
              ie_open('span', null, null,
                  'class', 'input-group-addon');
                itext('$');
              ie_close('span');
              ie_open('input', null, null,
                  'aria-label', 'Query',
                  'class', 'form-control',
                  'placeholder', 'Cypher query...',
                  'type', 'text');
              ie_close('input');
            ie_close('div');
          ie_close('form');
        ie_close('div');
      ie_close('div');
      ie_open('div', null, null,
          'class', 'row');
        ie_open('div', null, null,
            'class', 'col-md-4 flex-container');
          var labelList13 = opt_data.labels;
          var labelListLen13 = labelList13.length;
          for (var labelIndex13 = 0; labelIndex13 < labelListLen13; labelIndex13++) {
            var labelData13 = labelList13[labelIndex13];
            ie_open('div', null, null,
                'class', 'text-info bg-default drag-drop-item',
                'data-labelname', labelData13);
              itext((goog.asserts.assert((labelData13) != null), labelData13));
            ie_close('div');
          }
        ie_close('div');
        ie_open('div', null, null,
            'class', 'col-md-4 flex-container');
          var relationList21 = opt_data.relations;
          var relationListLen21 = relationList21.length;
          for (var relationIndex21 = 0; relationIndex21 < relationListLen21; relationIndex21++) {
            var relationData21 = relationList21[relationIndex21];
            ie_open('div', null, null,
                'class', 'text-info bg-default drag-drop-item',
                'data-labelname', relationData21);
              itext((goog.asserts.assert((relationData21) != null), relationData21));
            ie_close('div');
          }
        ie_close('div');
        ie_open('div', null, null,
            'class', 'col-md-4 flex-container');
          var keyList29 = opt_data.keys;
          var keyListLen29 = keyList29.length;
          for (var keyIndex29 = 0; keyIndex29 < keyListLen29; keyIndex29++) {
            var keyData29 = keyList29[keyIndex29];
            ie_open('div', null, null,
                'class', 'text-info bg-default drag-drop-item',
                'data-labelname', keyData29);
              itext((goog.asserts.assert((keyData29) != null), keyData29));
            ie_close('div');
          }
        ie_close('div');
      ie_close('div');
      ie_void('div', null, null,
          'id', 'dragDropTargetId',
          'class', 'row drag-drop-target');
      if (opt_data.commands.length > 0) {
        ie_open('div', null, null,
            'class', 'panel panel-default');
          ie_open('div', null, null,
              'class', 'panel-heading',
              'id', 'headingOne',
              'role', 'tab');
            ie_open('div', null, null,
                'class', 'panel-title');
              ie_open('a', null, null,
                  'aria-controls', 'collapseOne',
                  'aria-expanded', 'true',
                  'data-toggle', 'collapse',
                  'href', '#collapseOne',
                  'role', 'button');
                itext('Commands');
              ie_close('a');
            ie_close('div');
          ie_close('div');
          ie_open('div', null, null,
              'aria-labelledby', 'headingOne',
              'class', 'panel-collapse collapse in',
              'id', 'collapseOne',
              'role', 'tabpanel');
            ie_open('div', null, null,
                'class', 'panel-body');
              ie_open('div', null, null,
                  'class', 'row',
                  'id', 'rowCollapse1');
                ie_open('div', null, null,
                    'class', 'col-md-12');
                  ie_open('div', null, null,
                      'class', 'timeline');
                    var commandList38 = opt_data.commands;
                    var commandListLen38 = commandList38.length;
                    for (var commandIndex38 = 0; commandIndex38 < commandListLen38; commandIndex38++) {
                      var commandData38 = commandList38[commandIndex38];
                      ie_open('div', null, null,
                          'class', 'timeline-item');
                        ie_open('div', null, null,
                            'class', 'panel panel-default');
                          ie_open('div', null, null,
                              'class', 'panel-body');
                            ie_open('div', null, null,
                                'class', 'timeline-increment-icon');
                              ie_void('span', null, null,
                                  'class', 'timeline-icon');
                            ie_close('div');
                            itext((goog.asserts.assert((commandData38) != null), commandData38));
                          ie_close('div');
                        ie_close('div');
                      ie_close('div');
                    }
                  ie_close('div');
                ie_close('div');
              ie_close('div');
            ie_close('div');
          ie_close('div');
        ie_close('div');
      }
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'MetalNeo4j.render';
}

exports.render.params = ["commands","keys","labels","onInitalizeGraphEventHandler","onSubmitEventHandler","relations"];
exports.render.types = {"commands":"any","keys":"any","labels":"any","onInitalizeGraphEventHandler":"any","onSubmitEventHandler":"any","relations":"any"};
templates = exports;
return exports;

});

class MetalNeo4j extends Component {}
Soy.register(MetalNeo4j, templates);
export { MetalNeo4j, templates };
export default templates;
/* jshint ignore:end */
