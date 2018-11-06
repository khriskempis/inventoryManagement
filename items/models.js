"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
	name: { type: String, required: true },
	description: String,
	qty: { type: Number, default: 1 },
	cost: Number,
	price: Number,
	sale: Number,
	category: [String],
	status: String,
	image_url: {
		url: { type: String }
	}
});

ItemSchema.methods.serialize = function() {
	return {
		_id: this._id,
		name: this.name,
		description: this.description,
		qty: this.qty,
		cost: this.cost,
		price: this.price,
		sale: this.sale,
		category: this.category,
		status: this.status,
		image_url: { 
			url: this.image_url.url
		}
	}
};

const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item };


