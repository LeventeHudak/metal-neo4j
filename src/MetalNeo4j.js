'use strict';

import templates from './MetalNeo4j.soy';
import Component from 'metal-component';
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
			for (var i=0; i < arguments.length; i++) {
				var replacement = '{' + i + '}';
				content = content.replace(replacement, arguments[i]);
			}

			return content;
		};
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

		for (let i = 0; i < this.records_.length; i++) {
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
	}

	createInputElementForProperty(property, labelName, operator) {
		let inputDiv = document.createElement('div');
		inputDiv.className = 'form-group';

		let label = document.createElement('label');
		label.innerText = property;

		let input = document.createElement('input');
		input.className = 'form-control';
		input.type = 'text';
		input.placeholder = property + '...';

		let dataLabel = document.createAttribute('data-label');
		dataLabel.value = labelName;

		let dataProperty = document.createAttribute('data-property');
		dataProperty.value = property;

		let dataOperator = document.createAttribute('data-operator');
		dataOperator.value = operator;

		input.setAttributeNode(dataLabel);
		input.setAttributeNode(dataProperty);
		input.setAttributeNode(dataOperator);

		inputDiv.appendChild(label);
		inputDiv.appendChild(input);

		return inputDiv;
	}

	createElementForLabel(label) {
		let properties = this.labelProperties_.get(label);

		let cardDiv = document.createElement('div');
		cardDiv.className = 'card card-rounded query-element-drag';

		let dataLabel = document.createAttribute('data-label');
		dataLabel.value = label;

		cardDiv.setAttributeNode(dataLabel);

		let cardRowDiv = document.createElement('div');
		cardRowDiv.className = 'card-row card-row-padded card-row-valign-top';

		let cardInlineScrollerDiv = document.createElement('div');
		cardInlineScrollerDiv.className = 'inline-scroller';

		let cardTitle = document.createElement('h3');
		cardTitle.innerText = label;
		cardTitle.className = 'handle';

		cardDiv.appendChild(cardRowDiv);

		let divider = document.createElement('div');
		divider.className = 'divider';

		cardDiv.appendChild(divider);

		cardDiv.appendChild(cardInlineScrollerDiv);
		cardRowDiv.appendChild(cardTitle);

		let modalId = 'modalId_' + label + '_' + this.createUniqueId();

		let cardAddInputCriteriaBtn = document.createElement('button');
		cardAddInputCriteriaBtn.className = 'btn btn-block btn-primary btn-sm';
		cardAddInputCriteriaBtn.innerHTML = 'Add criteria';
		cardAddInputCriteriaBtn.type = 'button';

		let dataToggle = document.createAttribute('data-toggle');
		dataToggle.value = 'modal';

		let dataTarget = document.createAttribute('data-target');
		dataTarget.value = '#' + modalId;

		cardAddInputCriteriaBtn.setAttributeNode(dataToggle);
		cardAddInputCriteriaBtn.setAttributeNode(dataTarget);

		let divider2 = document.createElement('div');
		divider2.className = 'divider';

		cardInlineScrollerDiv.appendChild(divider2);
		cardInlineScrollerDiv.appendChild(cardAddInputCriteriaBtn);

		let modalElement = this.createLabelCriteriaSelectorElement(modalId, properties, label, cardInlineScrollerDiv);
		cardInlineScrollerDiv.appendChild(modalElement);

		return cardDiv;
	}

	createUniqueId() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	createLabelCriteriaSelectorElement(modalId, properties, labelName, element) {
		let app = this;

		let fragmentHtmlString = '<div class="fade modal" id="' + modalId + '" role="dialog">' +
			'<div class="modal-content modal-sm">' +
			'<div class="modal-header">' +
			'<button aria-labelledby="Close" class="btn btn-default close" data-dismiss="modal" role="button" type="button">' +
			'<span class="icon-remove"></span>' +
			'</button>' +
			'<button class="btn btn-default modal-primary-action-button visible-xs" type="button">' +
			'<span class="icon-remove"></span>' +
			'</button>' +
			'<h4 class="modal-title">Add Criteria</h4>' +
			'</div>' +

			'<div class="modal-body">' +
			'</div>' +

			'<div class="modal-footer">' +
			'<button class="btn btn-primary" id="' + modalId + '_btn" type="button">Primary</button>' +
			'<button class="btn btn-link close-modal" data-dismiss="modal" type="button">Close</button>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';

		let modalFragment = dom.buildFragment(fragmentHtmlString);
		let modalBody = modalFragment.querySelector('.modal-body');

		let dropDownFragmentString = '<select id=" ' + modalId + '_select_ANDOR">' +
			'<option value="AND">AND</option>' +
			'<option value="OR">OR</option>' +
			'</select>';

		let dropDownFragment = dom.buildFragment(dropDownFragmentString);
		modalBody.appendChild(dropDownFragment);

		let propertiesElement = document.createElement('select');
		propertiesElement.id = modalId + '_select_PROPERTIES';

		for (let i = 0; i < properties.length; i++) {
			let optionElement = document.createElement('option');
			optionElement.value = properties[i];
			optionElement.innerText = properties[i];

			propertiesElement.appendChild(optionElement);
		}

		modalBody.appendChild(propertiesElement);

		let modalSubmitBtn = modalFragment.querySelector('#' + modalId + '_btn');
		modalSubmitBtn.addEventListener('click', event => {
			let modal = document.querySelector('#' + modalId);
			let selects = modal.querySelectorAll('select');

			let operator = selects[0].value;
			let property = selects[1].value;

			let numberOfInputs = element.querySelectorAll('input').length;
			let input = null;

			if (numberOfInputs <= 0) {
				input = app.createInputElementForProperty(property, labelName, 'NONE');
			} else {
				input = app.createInputElementForProperty(property, labelName, operator);
			}

			element.insertBefore(input, element.firstChild);
		});

		return modalFragment;
	}

	handleDragDrop_(data, event) {
		event.preventDefault();

		let item = data.source;
		let labelName = item.getAttribute('data-label');

		if (this.labels.includes(labelName)) {
			let element = this.createElementForLabel(labelName);
			let target = document.querySelector('#dragDropTargetId');
			target.appendChild(element);

			element.style.position = 'absolute';
			element.style.left = data.x + 'px';
			element.style.top = data.y + 'px';
		}
	}

	onClearQueryBoardEventHandler(event) {
		event.preventDefault();

		let dragDropTarget = document.querySelector('#dragDropTargetId');

		while (dragDropTarget.firstChild) {
			dragDropTarget.removeChild(dragDropTarget.firstChild);
		}
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
