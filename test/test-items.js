'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../server');
const { Item } = require('../items');
const { TEST_DATABASE_URL } = require('../config'); 

const expect = chai.expect; 

chai.use(chaiHttp);

function generateItem() {
	return {
		name: faker.company.companyName(),
		description: faker.lorem.sentence(),
		qty: faker.random.number(),
		cost: faker.random.number(),
		price: {
			regular: faker.random.number(),
			sale: faker.random.number()
		},
		image_url: {url: faker.image.imageUrl()}
	}
}

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

describe('/items endpoint', function () {

	const newItem = generateItem(); 


	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer(); 
	});

	beforeEach(function() {

	});

	afterEach(function() {
		return Item.remove({name: newItem.name})
	});

	describe('POST', function() {

		it('should create a new item', function() {
			return chai.request(app)
				.post('/items')
				.send(newItem)
				.then(res => {
					expect(res).to.have.status(201);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.keys(
						'_id','name', 'description', 'qty', 'cost', 'price', 'image_url');
					expect(res.body.name).to.equal(newItem.name);
					expect(res.body.description).to.equal(newItem.description);
					expect(res.body.qty).to.equal(newItem.qty);
					expect(res.body.cost).to.equal(newItem.cost);
					expect(res.body.price.regular).to.equal(newItem.price.regular);
					expect(res.body.price.sale).to.equal(newItem.price.sale);
					expect(res.body.image_url.url).to.equal(newItem.image_url.url);
					return Item.findOne({ name: newItem.name });
				})
				.then(item => {
					expect(item).to.not.be.null;
					expect(item.name).to.equal(newItem.name);
					expect(item.description).to.equal(newItem.description);
					expect(item.qty).to.equal(newItem.qty);
					expect(item.cost).to.equal(newItem.cost);
					expect(item.price.regular).to.equal(newItem.price.regular); 
					expect(item.price.sale).to.equal(newItem.price.sale)
					expect(item.image_url.url).to.equal(newItem.image_url.url);
				});
		});

		// it('should reject item with missing name', function() {

		// });
	});

	describe('GET request', function(){

		it('should display all items in database', function() {

			const item1 = generateItem();
			const item2 = generateItem();
			const item3 = generateItem(); 
			return Item.create(	item1, item2, item3	)
			.then(() => chai.request(app).get('/items'))
			.then(res => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).have.length.gt(2)
			});
		});

		let item
		it('should find item by id', function() {
			const item1 = generateItem(); 
			return chai.request(app)
			.post('/items')
			.send(item1)
			.then(res => {
				item = res.body
				return chai.request(app).get(`/items/${item._id}`)
				})
				.then(res => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('object');
					expect(res.body._id).to.equal(item._id);
					expect(res.body.name).to.equal(item.name);
					expect(res.body.qty).to.equal(item.qty);
					expect(res.body.cost).to.equal(item.cost);
					expect(res.body.price.regular).to.equal(item.price.regular);
					expect(res.body.price.sale).to.equal(item.price.sale);
					expect(res.body.image_url.url).to.equal(item.image_url.url)
				});
		});
	});

	describe('PUT request', function() {

		it('should update item', function() {

			const item1 = generateItem()

			const updateData = {
				name: "Updated Name",
				description: faker.lorem.sentence(),
				qty: 18
			}

			let item 
			return chai.request(app)
				.post('/items')
				.send(item1)
				.then(res => {

					item = res.body
					updateData._id = (item._id);

					return chai.request(app)
						.put(`/items/${item._id}`)
						.send(updateData);
				})
				.then(res => {
					expect(res).to.have.status(204);

					return Item.findById(updateData._id)
				})
				.then(_item => {
					// expect(_item._id).to.be.equal(updateData._id);
					expect(_item.name).to.be.equal(updateData.name);
					expect(_item.description).to.be.equal(updateData.description);
					expect(_item.qty).to.be.equal(updateData.qty);
				});
		});
	});
	describe('DELETE request', function() {

		it('should remove item from database', function() {

			const item1 = generateItem();

			return chai.request(app)
				.post('/items')
				.send(item1)
				.then(res => {
					item1._id = res.body._id;
					return chai.request(app)
						.delete(`/items/${item1._id}`)
				})
				.then(res => {
					expect(res).to.have.status(204);
					return Item.findById(item1._id);
				})
				.then(_res => {
					expect(_res).to.be.null;
				});
		});
	});


});