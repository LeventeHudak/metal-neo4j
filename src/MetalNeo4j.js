'use strict';

import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';
import alert from 'metal-alert';
import DragDrop from 'metal-drag-drop';

class MetalNeo4j extends Component {
  created() {
    // Attaching Neo4j to the instance
    this.neo4j_ = window.neo4j;
    this.neo4jDriver_ = this.neo4j_.v1.driver('bolt://localhost', this.neo4j_.v1.auth.basic('neo4j', 'neo4jj'));
    this.neo4jSession_ = this.neo4jDriver_.session();

    // Attaching vis.js to the instance
    this.vis_ = window.vis;
  }

  disposed() {
    this.neo4jSession_.close();
    this.neo4jDriver_.close();
  }

  drawGraph() {
    // var nodes = new vis.DataSet([
    //     {id: 1, label: 'Node 1'},
    //     {id: 2, label: 'Node 2'},
    //     {id: 3, label: 'Node 3'},
    //     {id: 4, label: 'Node 4'},
    //     {id: 5, label: 'Node 5'}
    // ]);

    for(let i = 0; i < this.records_.length; i++) {
      console.log(this.records_[i]);
    }
  }

  handleQueryError_(err) {
    if (err.fields[0].code === 'Neo.ClientError.Statement.SyntaxError') {
      console.log(err.fields[0].message);

      this.alert = new metal.Alert({
        visible: true,
        body: err.fields[0].message,
        elementClasses: 'alert-danger',
        hideDelay: 5000
      },
      '#errorId');
    }
  }

  onInitalizeGraphEventHandler() {
    let app = this;

    // Get all relation types
    this.neo4jSession_.run('match ()-[r]-() return distinct type(r)').then(result => {
      let relations = [];

      for (let i = 0; i < result.records.length; i++) {
        relations.push(result.records[i]._fields[0]);
      }

      app.relations = relations;
    }).catch( err => app.handleQueryError_(err) );

    // Get all labels
    this.neo4jSession_.run('match (n) return distinct labels(n)').then(result => {
      let labels = [];

      for (let i = 0; i < result.records.length; i++) {
        labels.push(result.records[i]._fields[0][0]);
      }

      app.labels = labels;
    }).catch( err => app.handleQueryError_(err) );

    // Get all keys
    this.neo4jSession_.run('match (n) return distinct keys(n)').then(result => {
      let keys = new Set();

      for (let i = 0; i < result.records.length; i++) {
        for (let x = 0; x < result.records[i]._fields[0].length; x++) {
          keys.add(result.records[i]._fields[0][x]);
        }
      }

      let keysArray = Array.from(keys);

      app.keys = keysArray;
    }).catch( err => app.handleQueryError_(err) );

    var dragDrop = new metal.DragDrop({
			dragPlaceholder: metal.Drag.Placeholder.CLONE,
			handles: '.drag-drop-item',
			sources: '.box',
			targets: '.drag-drop-target'
		});

		dragDrop.on(metal.DragDrop.Events.END, (data, event) => this.handleQuery_(data, event));
  }

  handleQuery_(data, event) {
    event.preventDefault();

    let item = data.source;
    let labelName = item.getAttribute('data-labelname').toString();

    console.log('Hit target:', labelName);

    this.neo4jSession_.run('match (n: ' + labelName + ') return n').then(result => {
      console.log(result);
    }).catch( err => app.handleQueryError_(err) );
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    let app = this;

    app.neo4jSession_.run(event.target[0].value)
      .then( function(result)
      {
        app.records = result.records;
        app.commands.push(event.target[0].value);

        console.log(result);
      })
      .catch( err => app.handleQueryError_(err) );
  }
}
Soy.register(MetalNeo4j, templates);

MetalNeo4j.STATE = {
  alert: {
    value: null
  },

  keys: {
    validator: Array.isArray,
    value: () => []
  },

  labels: {
    validator: Array.isArray,
    value: () => []
  },

  records: {
    validator: Array.isArray,
    value: () => []
  },

  relations: {
    validator: Array.isArray,
    value: () => []
  },

  commands: {
    validator: Array.isArray,
    value: []
  }
};

export default MetalNeo4j;
