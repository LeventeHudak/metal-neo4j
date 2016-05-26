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
            'href', '#');
          itext('Metal Neo4j');
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
                    var commandList12 = opt_data.commands;
                    var commandListLen12 = commandList12.length;
                    for (var commandIndex12 = 0; commandIndex12 < commandListLen12; commandIndex12++) {
                      var commandData12 = commandList12[commandIndex12];
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
                            itext((goog.asserts.assert((commandData12) != null), commandData12));
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
      if (opt_data.records.length > 0) {
        ie_open('div', null, null,
            'class', 'panel panel-default');
          ie_open('div', null, null,
              'class', 'panel-heading',
              'id', 'headingTwo',
              'role', 'tab');
            ie_open('div', null, null,
                'class', 'panel-title');
              ie_open('a', null, null,
                  'aria-controls', 'collapseTwo',
                  'aria-expanded', 'true',
                  'data-toggle', 'collapse',
                  'href', '#collapseTwo',
                  'role', 'button');
                itext('Records');
              ie_close('a');
            ie_close('div');
          ie_close('div');
          ie_open('div', null, null,
              'aria-labelledby', 'headingTwo',
              'class', 'panel-collapse collapse in',
              'id', 'collapseTwo',
              'role', 'tabpanel');
            ie_open('div', null, null,
                'class', 'panel-body');
              ie_open('div', null, null,
                  'class', 'row');
                ie_open('div', null, null,
                    'class', 'col-md-12');
                  ie_open('div', null, null,
                      'id', 'queryResultId');
                    var recordList21 = opt_data.records;
                    var recordListLen21 = recordList21.length;
                    for (var recordIndex21 = 0; recordIndex21 < recordListLen21; recordIndex21++) {
                      var recordData21 = recordList21[recordIndex21];
                      $renderCard({record: recordData21, currentIndex: recordIndex21}, null, opt_ijData);
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


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderCard(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'class', 'card card-horizontal card-rounded card-inline bg-primary');
    ie_open('div', null, null,
        'class', 'card-row card-row-valign-top');
      ie_open('div', null, null,
          'class', 'card-col-content card-col-gutters');
        ie_open('h4');
          itext('Record ');
          itext((goog.asserts.assert((opt_data.currentIndex) != null), opt_data.currentIndex));
        ie_close('h4');
        ie_void('div', null, null,
            'class', 'divider');
        var keyList34 = opt_data.record.keys;
        var keyListLen34 = keyList34.length;
        for (var keyIndex34 = 0; keyIndex34 < keyListLen34; keyIndex34++) {
          var keyData34 = keyList34[keyIndex34];
          ie_open('p');
            itext((goog.asserts.assert((keyData34) != null), keyData34));
            itext(' = ');
            itext((goog.asserts.assert((opt_data.record._fields[keyIndex34]) != null), opt_data.record._fields[keyIndex34]));
          ie_close('p');
        }
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.renderCard = $renderCard;
if (goog.DEBUG) {
  $renderCard.soyTemplateName = 'MetalNeo4j.renderCard';
}

exports.render.params = ["commands","onSubmitEventHandler","records"];
exports.render.types = {"commands":"any","onSubmitEventHandler":"any","records":"any"};
exports.renderCard.params = ["record","currentIndex"];
exports.renderCard.types = {"record":"any","currentIndex":"any"};
templates = exports;
return exports;

});

class MetalNeo4j extends Component {}
Soy.register(MetalNeo4j, templates);
export { MetalNeo4j, templates };
export default templates;
/* jshint ignore:end */
