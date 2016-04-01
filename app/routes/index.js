'use strict';

var path = process.cwd();
var request = require('request');
var SearchHandler = require(path + '/app/controllers/searchHandler.js');

module.exports = function (app, passport) {
	var pixabayAPI = 'https://pixabay.com/api/?key=' + process.env.API_KEY;
	var searchHandler = new SearchHandler();
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/api/imagesearch/:query')
		.get(function (req, res) {
			//Getting queries
			var search = req.params.query;
			var	offset = req.query.offset || 1;
			
			//saving search phrases
			searchHandler.saveSearch(req, res, search);
			//TODO: over page using totalHits or total
			request (pixabayAPI + '&q=' + search + '&page=' + offset, function(error, response, body) {
				if ( error ) { res.send('Something wrong, try again later!')}
				var rawResults = JSON.parse(body).hits;
				res.json(rawResults.map(function(hit) {
					return {
						'url': hit.pageURL,
						'tags': hit.tags,
						'thumbnail': hit.previewURL,
						'user': hit.userImageURL
					};
				}));
			});
		});

	app.route('/api/recent')
		.get(function(req, res) {
			searchHandler.getSearch(req, res);
		});
	
};
