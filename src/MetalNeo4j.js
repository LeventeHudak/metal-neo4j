'use strict';

import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';
import alert from 'metal-alert';
import DragDrop from 'metal-drag-drop';
import dom from 'metal-dom';

class MetalNeo4j extends Component {
  created() {
    // Attaching Neo4j to the instance
    this.neo4j_ = window.neo4j;
    this.neo4jDriver_ = this.neo4j_.v1.driver('bolt://localhost', this.neo4j_.v1.auth.basic('neo4j', 'neo4jj'));
    this.neo4jSession_ = this.neo4jDriver_.session();

    // Attaching vis.js to the instance
    this.vis_ = window.vis;

    this.labelProperties_ = new Map();
    this.relationProperties_ = [];
  }

  // Returns a promise
  runQuery(queryString) {
    return this.neo4jSession_.run(queryString);
  }

  disposed() {
    this.neo4jSession_.close();
    this.neo4jDriver_.close();
  }

  drawGraph(data) {
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
    this.runQuery('match ()-[r]-() return distinct type(r)').then(result => {
      let relations = [];

      for (let i = 0; i < result.records.length; i++) {
        relations.push(result.records[i]._fields[0]);
      }

      app.relations = relations;
    }).catch( err => app.handleQueryError_(err) );

    // Get all labels and label properties
    this.runQuery('match (n) return distinct labels(n)').then(result => {
      let labels = [];

      for (let i = 0; i < result.records.length; i++) {
        let label = result.records[i]._fields[0][0];
        let labelProperties = new Set();

        labels.push(label);

        app.runQuery('match (n:' + label + ') return distinct keys(n)').then(result => {
          for (let x = 0; x < result.records.length; x++) {
            for (let y = 0; y < result.records[x]._fields[0].length; y++) {
              labelProperties.add(result.records[x]._fields[0][y]);
            }
          }

          app.labelProperties_.set(label, Array.from(labelProperties));
        }).catch(err => app.handleQueryError_(err));
      }

      app.labels = labels;
    }).catch( err => app.handleQueryError_(err) );

    // Get all keys
    this.runQuery('match (n) return distinct keys(n)').then(result => {
      let keys = new Set();

      for (let i = 0; i < result.records.length; i++) {
        for (let x = 0; x < result.records[i]._fields[0].length; x++) {
          keys.add(result.records[i]._fields[0][x]);
        }
      }

      let keysArray = Array.from(keys);

      app.keys = keysArray;
    }).catch( err => app.handleQueryError_(err) );

    var queryElementsDragDrop = new metal.DragDrop({
			dragPlaceholder: metal.Drag.Placeholder.CLONE,
			handles: '.drag-drop-item',
			sources: '.drag-drop-item',
			targets: '.drag-drop-target'
		});

    queryElementsDragDrop.on(metal.DragDrop.Events.END, (data, event) => this.handleQuery_(data, event));

    var draggedElementsDragDrop = new metal.DragDrop({
			dragPlaceholder: metal.Drag.Placeholder.CLONE,
      constrain: '#dragDropTargetId',
			handles: '.handle',
			sources: '.query-element-drag',
			targets: '.query-element-drag'
		});
  }

  createInputElementForName(name) {
    let inputDiv = document.createElement('div');
    inputDiv.className = 'form-group';

    let label = document.createElement('label');
    label.innerText = name;

    let input = document.createElement('input');
    input.className = 'form-control';
    input.type = 'text';
    input.placeholder = name + '...';

    inputDiv.appendChild(label);
    inputDiv.appendChild(input);

    return inputDiv;
  }

  createElementForLabel(label) {
    let properties = this.labelProperties_.get(label);
    console.log(properties);

    let cardDiv = document.createElement('div');
    cardDiv.className = 'card card-rounded query-element-drag';

    let cardHandle = document.createElement('div');
    cardHandle.className = 'handle';

    let cardHandleIcon = document.createElement('span');
    cardHandleIcon.className = 'icon-move';

    let cardRowDiv = document.createElement('div');
    cardRowDiv.className = 'card-row card-row-padded card-row-valign-top';

    let cardColContent = document.createElement('div');
    cardColContent.className = 'card-row card-row-padded card-row-valign-top';

    let cardTitle = document.createElement('h3');
    cardTitle.innerText = label;

    let cardContent = document.createElement('h5');
    cardContent.innerText = 'test inner text h5';
    let inputVagyok = this.createInputElementForName('test');
    let pElement = document.createElement('p');
    pElement.innerText = 'TEST P ELEMENT TEXT';

    cardHandle.appendChild(cardHandleIcon);
    cardDiv.appendChild(cardHandle);
    cardDiv.appendChild(cardRowDiv);
    cardRowDiv.appendChild(cardColContent);
    cardColContent.appendChild(cardTitle);
    cardColContent.appendChild(inputVagyok);
    cardColContent.appendChild(pElement);

    return cardDiv;
  }

  handleQuery_(data, event) {
    event.preventDefault();

    let item = data.source;
    let labelName = item.getAttribute('data-labelname').toString();

    console.log('Hit target:', labelName);

    let element = this.createElementForLabel(labelName);

    let target = document.querySelector('#dragDropTargetId');
    target.appendChild(element);
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    let app = this;

    app.runQuery(event.target[0].value)
      .then( function(result)
      {
        app.records = result.records;
        app.commands.push(event.target[0].value);
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
