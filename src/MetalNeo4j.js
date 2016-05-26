'use strict';

import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';
import alert from 'metal-alert';

class MetalNeo4j extends Component {
  attached() {
    // Attaching Neo4j to the instance
    this.neo4j = window.neo4j;
    this.neo4jDriver = this.neo4j.v1.driver('bolt://localhost', this.neo4j.v1.auth.basic('neo4j', 'neo4jj'));
    this.neo4jSession = this.neo4jDriver.session();
  }

  disposed() {
    this.neo4jSession.close();
    this.neo4jDriver.close();
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    let app = this;

    app.neo4jSession.run( event.target[0].value )
      .then( function(result)
      {
        app.records = result.records;
        app.commands.push(event.target[0].value);

        console.log(result);
      })
      .catch( function (err) {
        if (err.fields[0].code === 'Neo.ClientError.Statement.SyntaxError') {
          console.log(err.fields[0].message);

          app.alert = new metal.Alert({
      			visible: true,
      			body: err.fields[0].message,
      			elementClasses: 'alert-danger',
      			hideDelay: 10000
      		},
          '#errorId');
        }
      });
  }
}
Soy.register(MetalNeo4j, templates);

MetalNeo4j.STATE = {
  alert: {
    value: null
  },

  neo4j: {
    value: null
  },

  neo4jDriver: {
    value: null
  }
  ,

  neo4jSession: {
    value: null
  },

  records: {
    validator: Array.isArray,
    value: []
  },

  commands: {
    validator: Array.isArray,
    value: []
  }
};

export default MetalNeo4j;
