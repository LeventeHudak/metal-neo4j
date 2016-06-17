'use strict';

import core from 'metal';
import templates from './RelationNode.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class RelationNode extends Component {
  rendered() {
    //console.log(this.label + '  left: ' + this.left + ' top: ' + this.top);
  }
}
Soy.register(RelationNode, templates);

RelationNode.STATE = {
  id: {
		validator: Array.isNumber,
		valueFn: () => 0
	},

  label: {
    validator: core.isString,
    valueFn: () => ''
  },

  left: {
    validator: core.isNumber,
    valueFn: () => 0
  },

  top: {
    validator: core.isNumber,
    valueFn: () => 0
  }
};
