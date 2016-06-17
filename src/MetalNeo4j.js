'use strict';

import Ajax from 'metal-ajax';
import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
import core from 'metal';
import MultiMap from 'metal-multimap';
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

		let graphDbElementsDragDrop = new metal.DragDrop({
			dragPlaceholder: metal.Drag.Placeholder.CLONE,
			handles: '.drag-drop-item',
			sources: '.drag-drop-item',
			targets: '.drag-drop-target'
		});

		graphDbElementsDragDrop.on(metal.DragDrop.Events.END, (data, event) => this.handleGraphDbElementsDragDrop_(data, event));

		let queryElementsDrag = new metal.DragDrop({
			constrain: '#dragDropTargetId',
			handles: '.handle',
			sources: '.query-element-drag',
			steps: {
				x: 5,
				y: 5
			}
		});

		queryElementsDrag.on(metal.DragDrop.Events.DRAG, (data, event) => this.handleQueryElementsDrag_(data, event));

		new metal.DragDrop({
			constrain: '#dragDropTargetId',
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
		}
	}

	onInitalizeGraphEventHandler() {
		let self = this;

		if (this.initalized_ !== true) {
			dom.toggleClasses(this.element.querySelector('.loading-overlay'), 'hide');

			var headers = new MultiMap();
			headers.add('Accept', 'application/json; charset=UTF-8');
			headers.add('Authorization', 'Basic realm="neo4j" bmVvNGo6bmVvNGpq');

			Ajax.request('http://localhost:7474/db/data/labels', 'GET', null, headers).then(result => {
				this.labels = JSON.parse(result.response);
			}).then(() => {
				for (let i = 0; i < this.labels.length; i++) {
					let labelProperties = new Set();

					self.runQuery('match (n:' + this.labels[i] + ') return distinct keys(n)').then(result => {
						for (let x = 0; x < result.records.length; x++) {
							for (let y = 0; y < result.records[x]._fields[0].length; y++) {
								labelProperties.add(result.records[x]._fields[0][y]);
							}
						}

						self.labelProperties_.set(this.labels[i], Array.from(labelProperties));
						dom.toggleClasses(this.element.querySelector('.loading-overlay'), 'hide');
					}).catch(err => self.handleQueryError_(err));
				}
			});

			Ajax.request('http://localhost:7474/db/data/relationship/types', 'GET', null, headers).then(result => {
				this.relations = JSON.parse(result.response);
			});

			Ajax.request('http://localhost:7474/db/data/propertykeys', 'GET', null, headers).then(result => {
				this.keys = JSON.parse(result.response);
			});

			this.initalized_ = true;
		}
	}

	handleQueryElementsDrag_(data, event) {
		let item = data.source;
		let id = item.getAttribute('data-id');

		if (dom.hasClass(item, 'metal-label-node')) {
			for (let i = 0; i < this.queryLabels.length; i++) {
				if (this.queryLabels[i].id == id) {
					this.queryLabels[i].left = data.x;
					this.queryLabels[i].top = data.y;
				}
			}
		}
		else if (dom.hasClass(item, 'metal-relation-node')) {
			for (let i = 0; i < this.queryRelations.length; i++) {
				if (this.queryRelations[i].id == id) {
					this.queryRelations[i].left = data.x;
					this.queryRelations[i].top = data.y;
				}
			}
		}
		else {
			//TODO for properties maybe
		}
	}

	handleGraphDbElementsDragDrop_(data, event) {
		event.preventDefault();

		let item = data.source;
		let labelName = item.getAttribute('data-label');

		if (this.labels.includes(labelName)) {
			let queryLabel = {
				id: core.getUid(),
				labelName: labelName,
				left: data.x,
				top: data.y,
				properties: this.labelProperties_.get(labelName)
			};

			this.queryLabels.push(queryLabel);
			this.queryLabels = this.queryLabels;
		}

		else if (this.relations.includes(labelName)) {
			let queryRelation = {
				id: core.getUid(),
				labelName: labelName,
				left: data.x,
				top: data.y
			};

			this.queryRelations.push(queryRelation);
			this.queryRelations = this.queryRelations;
		}
	}

	onClearQueryBoardEventHandler(event) {
		event.preventDefault();

		let dragDropTarget = document.querySelector('#dragDropTargetId');

		while (dragDropTarget.firstChild) {
			dragDropTarget.removeChild(dragDropTarget.firstChild);
		}

		this.queryLabels = new Array();
		this.queryRelations = new Array();
		this.queries = new Array();
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

		if (this.queries.length > 4) {
			this.queries.splice(0, 1);
			this.queries.push(cypherQuery);
		}
		else {
			this.queries.push(cypherQuery);
		}

		this.queries = this.queries;
	}
}
Soy.register(MetalNeo4j, templates);

MetalNeo4j.STATE = {
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
	},

	queryRelations: {
		validator: Array.IsArray,
		valueFn: () => []
	},

	queries: {
		validator: Array.IsArray,
		valueFn: () => []
	}
};

export default MetalNeo4j;
