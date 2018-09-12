'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose'); 


const { app, runServer, closeServer } = require('../server'); 
const { TEST_DATABASE_URL } = require('../config');



const expect = chai.expect;

chai.use(chaiHttp);

describe('Server working', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	after(function() {
		return closeServer(); 
	});

	it('should serve static assets to client', function() {
		return chai.request(app)
			.get('/')
			.then((res) => {
				expect(res).to.have.status(200); 
			})
	});

});