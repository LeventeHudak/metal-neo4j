'use strict';

import core from 'metal';
import templates from './LabelNode.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

import 'metal-modal';

class LabelNode extends Component {
  onAddCriteriaClickEventHandler(event) {
    let selectors = this.components.modal.element.querySelectorAll('select');

    let andOrValue = selectors[0].value;
    let propertyValue = selectors[1].value;

    let input = {
      property: propertyValue,
      operator: this.inputs.length > 0 ? andOrValue : 'NONE'
    };

    this.inputs.push(input);
    this.inputs = this.inputs;
  }

  onShowModalClickEventHandler() {
    this.components.modal.show();
  }
}
Soy.register(LabelNode, templates);

LabelNode.STATE = {
  inputs: {
    validator: Array.isArray,
    valueFn: () => []
  },

  label: {
    validator: core.isString,
    value: ''
  },

  left: {
    validator: core.isNumber,
    value: 0
  },

  top: {
    validator: core.isNumber,
    value: 0
  },

  properties: {
    validator: Array.isArray,
    valueFn: () => []
  }
}
