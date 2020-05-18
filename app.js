'use strict';

const express = require('express');
const server = express();
let commerces = require('./data/commerces');
let layer = require('./data/layer');
let graph = require('./data/graph');

const body_parser = require('body-parser');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads' });
var path = require('path');
var fs = require('fs');

const port = process.env.PORT || 8080;

// parse JSON (application/json content-type)
server.use(body_parser.urlencoded({extended:false}));
server.use(body_parser.json());

// configurar cabeceras http
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

server.get("/", (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

server.get("/commerces/layer", (req, res) => {
   res.json(layer);
});

server.get("/commerces/graph", (req, res) => {
   res.json(graph);
});

server.get("/commerces", (req, res) => {
   res.json(commerces);
});

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
   console.log('Press Ctrl+C to quit.');
});

module.exports = server;