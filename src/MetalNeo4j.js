'use strict';

import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
import core from 'metal';
import Soy from 'metal-soy';
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

		String.prototype.format = function() {
			var content = this;
			for (var i = 0; i < arguments.length; i++) {
				var replacement = '{' + i + '}';
				content = content.replace(replacement, arguments[i]);
			}

			return content;
		};

		let queryElementsDragDrop = new metal.DragDrop({
			dragPlaceholder: metal.Drag.Placeholder.CLONE,
			handles: '.drag-drop-item',
			sources: '.drag-drop-item',
			targets: '.drag-drop-target'
		});

		queryElementsDragDrop.on(metal.DragDrop.Events.END, (data, event) => this.handleDragDrop_(data, event));

		new metal.DragDrop({
			constrain: '#dragDropTargetId',
			handles: '.handle',
			sources: '.query-element-drag',
			steps: {
				x: 5,
				y: 5
			}
		});

		new metal.DragDrop({
			handles: '.handle',
			sources: '.metal-graph-entity-container',
			steps: {
				x: 5,
				y: 5
			}
		});
	}

	// Returns a promise
	runQuery(queryString) {
		return this.neo4jSession_.run(queryString);
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
	}

	handleQueryError_(err) {
		if (err.fields[0].code === 'Neo.ClientError.Statement.SyntaxError') {
			console.log(err.fields[0].message);

			this.alert = new Alert({
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
		if (this.initalized_ !== true) {
			// Get all relation types
			this.runQuery('match ()-[r]-() return distinct type(r)').then(result => {
				let relations = [];

				for (let i = 0; i < result.records.length; i++) {
					relations.push(result.records[i]._fields[0]);
				}

				app.relations = relations;
			}).catch(err => app.handleQueryError_(err));

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
			}).catch(err => app.handleQueryError_(err));

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
			}).catch(err => app.handleQueryError_(err));

			this.initalized_ = true;
		}
	}

	handleDragDrop_(data, event) {
		event.preventDefault();

		let item = data.source;
		let labelName = item.getAttribute('data-label');

		if (this.labels.includes(labelName)) {
			let queryLabel = {
				labelName: labelName,
				left: data.x,
				top: data.y,
				properties: this.labelProperties_.get(labelName)
			};

			this.queryLabels.push(queryLabel);
			this.queryLabels = this.queryLabels;
		}
	}

	onClearQueryBoardEventHandler(event) {
		event.preventDefault();

		let dragDropTarget = document.querySelector('#dragDropTargetId');

		while (dragDropTarget.firstChild) {
			dragDropTarget.removeChild(dragDropTarget.firstChild);
		}

		this.queryLabels = new Array();
	}

	onSubmitEventHandler(event) {
		event.preventDefault();

		let form = document.querySelector('#queryFormId');
		let cards = form.querySelectorAll('.card');
		let cypherQuery = '';

		let singleMatchCypherPattern = 'MATCH(n:{0}) {1} return n';
		let whereCriteriaPattern = 'WHERE {0}';

		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];

			let cardDataLabel = card.getAttribute('data-label');
			let matchCypher = singleMatchCypherPattern.format(cardDataLabel);

			let cardInputs = card.getElementsByTagName('input');

			let cardInputCypher = '';

			for (let x = 0; x < cardInputs.length; x++) {
				let input = cardInputs[x];

				let label = input.getAttribute('data-label');

				if (!label || (label !== cardDataLabel)) {
					continue;
				}

				let property = input.getAttribute('data-property');
				let operator = input.getAttribute('data-operator');
				let value = input.value;

				if (!value) {
					continue;
				}

				if (cardInputCypher && operator === 'NONE') {
					operator = 'AND';
				}

				if (cardInputCypher) {
					cardInputCypher += (' ' + operator + ' ');
				}

				cardInputCypher += ('(n.' + property + ' = "' + value + '")');
			}

			if (cardInputCypher) {
				cardInputCypher = whereCriteriaPattern.format(cardInputCypher);
			}

			matchCypher = singleMatchCypherPattern.format(cardDataLabel, cardInputCypher);

			if (cypherQuery) {
				cypherQuery += ' UNION ';
			}

			cypherQuery += matchCypher;
		}

		this.runQuery(cypherQuery).then(event => {
			console.log(event);
		});

		console.log('Query: ' + cypherQuery);
	}
}
Soy.register(MetalNeo4j, templates);

MetalNeo4j.STATE = {
	alert: {
		value: null
	},

	keys: {
		validator: Array.isArray,
		valueFn: () => []
	},

	labels: {
		validator: Array.isArray,
		valueFn: () => []
	},

	relations: {
		validator: Array.isArray,
		valueFn: () => []
	},

	queryLabels: {
		validator: Array.IsArray,
		valueFn: () => []
	}
};

export default MetalNeo4j;
