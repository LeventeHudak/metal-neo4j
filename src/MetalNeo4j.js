'use strict';

import Ajax from 'metal-ajax';
import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
import core from 'metal';
import MultiMap from 'metal-multimap';
import Soy from 'metal-soy';
import DragDrop from 'metal-drag-drop';
import dom from 'metal-dom';
import Position from 'metal-position';

class MetalNeo4j extends Component {
	created() {
		// EXPERIMENTAL GRAPH DISPLAY
		this.EXPERIMENTAL_ = false;

		// Attaching Neo4j to the instance
		this.neo4j_ = window.neo4j;
		this.neo4jDriver_ = this.neo4j_.v1.driver('bolt://localhost', this.neo4j_.v1.auth.basic('neo4j', 'neo4jj'));
		this.neo4jSession_ = this.neo4jDriver_.session();

		//Neo4j REST API
		this.neo4jTxURL_ = 'http://localhost:7474/db/data/transaction/commit';
		this.neo4jHeaders_ = new MultiMap();
		this.neo4jHeaders_.add('Accept', 'application/json; charset=UTF-8');
		this.neo4jHeaders_.add('Authorization', 'Basic realm="neo4j" bmVvNGo6bmVvNGpq');
		this.neo4jHeaders_.add('Content-Type', 'application/json');

		this.d3_ = window.d3;

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

	idIndex(a, id) {
		for (var i = 0; i < a.length; i++) {
			if (a[i].id == id) {
				return i;
			}
		}

		return null;
	}

	getDrawableDataset(result) {
		let self = this;
		let nodes = [],
		links = [];

		console.log(result.results[0]);

		result.results[0].data.forEach(function(row) {
			row.graph.nodes.forEach(function(n) {
				if (self.idIndex(nodes, n.id) == null) {
					let id = n.id;
					let label = n.labels[0];
					let title = core.isDefAndNotNull(n.properties.name) ? n.properties.name : '';
					//console.log(id + ' ' + label + ' ' + title);
					nodes.push({
						id: id,
						label: label,
						title: title
					});
				}
			});

			links = links.concat(row.graph.relationships.map(function(r) {
				console.log(r.startNode + ' ' + r.endNode);
				return {
					source: self.idIndex(nodes, r.startNode),
					target: self.idIndex(nodes, r.endNode),
					type: r.type
				};
			}));
		});

		//EXPERIMENTAL!!!!!!
		dom.toggleClasses(this.element.querySelector('.loading-overlay'), 'hide');
		dom.toggleClasses(this.element.querySelector('#graph'), 'metal-graph');
		dom.toggleClasses(this.element.querySelector('#metal-neo4j-main-content'), 'metal-graph-display-background');

		// Compute the distinct nodes from the links.
		links.forEach(function(link) {
			link.source = nodes[link.source] ||
			(nodes[link.source] = {
				name: link.source
			});
			link.target = nodes[link.target] ||
			(nodes[link.target] = {
				name: link.target
			});
			link.value = +link.value;
		});

		var width = Position.getWidth(this.element.querySelector('#queryFormId')),
		height = Position.getHeight(this.element.querySelector('#queryFormId'));

		var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.size([width, height])
		.linkDistance(40)
		.charge(-200)
		.on("tick", tick)
		.start();

		var svg = d3.select("#graph").append("svg")
		.attr("width", width)
		.attr("height", height);


		var link = svg.selectAll(".link")
		.data(force.links())
		.enter().append("line")
		.attr("class", "link");

		var node = svg.selectAll(".node")
		.data(force.nodes())
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

		node.append("circle")
		.attr("r", 8);

		node.append("text")
		.attr("x", 12)
		.attr("dy", ".35em")
		.text(function(d) {
			console.log(d);
			return d.title || d.label;
		});

		function tick() {
			link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

			node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		}
	}

	disposed() {
		this.neo4jSession_.close();
		this.neo4jDriver_.close();
	}

	runCypherOverREST(query, params, cb) {
		let self = this;

		dom.toggleClasses(this.element.querySelector('.loading-overlay'), 'hide');

		query = 'MATCH path = (n)-[r]->(m) RETURN path';
		let body2 = {
			"statements": [{
				"statement": query,
				"resultDataContents": ["graph"]
			}]
		};

		var body = {
			query: query,
			params: {}
		};

		Ajax.request(this.neo4jTxURL_, 'POST', JSON.stringify(body2), this.neo4jHeaders_).then(result => {
			self.getDrawableDataset(JSON.parse(result.response));
		});
	}

	handleQueryError_(err) {
		if (err.fields[0].code === 'Neo.ClientError.Statement.SyntaxError') {
			console.log(err.fields[0].message);
		}
	}

	onInitalizeGraphEventHandler() {
		let self = this;

		if (this.initalized_ !== true) {
			//dom.toggleClasses(this.element.querySelector('.loading-overlay'), 'hide');

			Ajax.request('http://localhost:7474/db/data/labels', 'GET', null, this.neo4jHeaders_).then(result => {
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
						//dom.toggleClasses(this.element.querySelector('.loading-overlay'), 'hide');
					}).catch(err => self.handleQueryError_(err));
				}
			});

			Ajax.request('http://localhost:7474/db/data/relationship/types', 'GET', null, this.neo4jHeaders_).then(result => {
				this.relations = JSON.parse(result.response);
			});

			Ajax.request('http://localhost:7474/db/data/propertykeys', 'GET', null, this.neo4jHeaders_).then(result => {
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
		} else if (dom.hasClass(item, 'metal-relation-node')) {
			for (let i = 0; i < this.queryRelations.length; i++) {
				if (this.queryRelations[i].id == id) {
					this.queryRelations[i].left = data.x;
					this.queryRelations[i].top = data.y;
				}
			}
		} else {
			//TODO Properties?
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
		} else if (this.relations.includes(labelName)) {
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

		if (this.EXPERIMENTAL_) {
			this.runCypherOverREST(cypherQuery);
		}
		else {
			this.runQuery(cypherQuery).then(event => {
				console.log(event);
			});
		}

		console.log('Query: ' + cypherQuery);

		if (this.queries.length > 4) {
			this.queries.splice(0, 1);
			this.queries.push(cypherQuery);
		} else {
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

//TODO Be able to delete single entities from the query board
//TODO Clean up css
//TODO Clean up code
//TODO Be able to connect relations with labels on the UI
//TODO neo4j driver: .run( "" ).subscribe({onNext: function()});
