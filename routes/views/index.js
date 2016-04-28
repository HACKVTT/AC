var keystone = require('keystone');
// var _ = require('lodash');

exports = module.exports = function(req, res) {
	'use strict';
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = '/';

	locals.data = {
		post: []
	};

	// Query get list service and title category of them
	view.on('init', function(next) {
		
		var q = keystone.list('Service').model.find({
			state: 'published',
			showHome: 'feature'
		}).populate('cateservice ServicesCategories');

		q.exec(function(err, results) {
			locals.data.post = results;
			// console.log('result:', results);
			next(err);
		});
	});

	// Render the view
	view.render('index');
	
};