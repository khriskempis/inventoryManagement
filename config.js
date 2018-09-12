'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/inventoryManagement';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-inventoryManagement';
exports.PORT = process.env.PORT || 8080; 
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRT = process.env.JWT_EXPIRY || '7d'; 