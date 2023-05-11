'use strict';

/**
 * item controller
 */
const express = require('express');
const app = express();

// Set cache-control header to one year for static assets
const oneYear = 31536000;
app.use(express.static('public', { maxAge: oneYear }));

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::item.item');
