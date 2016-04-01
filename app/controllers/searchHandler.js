'use strict';

var Search = require('../models/searchs.js');

function SearchHandler() {
    
    this.getSearch = function(req, res) {
        Search
            .find({}, {'_id': false})
            .sort('-time')
            .limit(10)
            .exec(function(err, results) {
                if (err) { throw err; }
                res.send(results);
            });
    };
    
    this.saveSearch = function(req, res, search) {
        Search.update({'phrase': search}, {'time': new Date(), 'phrase': search}, {upsert: true, setDefaultsOnInsert: true}, function(err, newUpdate) {
            if (err) { throw err; }
            console.log(newUpdate);
        });
    };
}

module.exports = SearchHandler;