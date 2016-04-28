var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.filters = {
		category: req.params.cateservice
	};
	// Init locals
	locals.section = locals.filters.category;
	locals.data = {
		posts: [],
		categories: []
	};

	var slugCate = locals.section;

	// Load categories
	view.on('init', function(next) {
		if (slugCate) {
			keystone.list('ServicesCategories').model.findOne({
				slug: slugCate
			}).exec(function(err, result) {
				locals.data.categories = result;
				// console.log('locals.categories:', locals.categories);
				next(err);
			});
		}
		else{
			next();
		}
	});


	// Load Post In Current Category

	view.on('init', function(next) {
		var q = keystone.list('Service').model.find({
					state: 'published'
				})
				.populate('author cateservice')
				.sort('-publishedDate');

				if (locals.data.categories !== null && locals.data.categories._id) {
					q.where('cateservice') .in([locals.data.categories._id]);
				}

				q.exec(function(err, result) {
					locals.data.posts = result;

					// console.log('Result Post:', result);
					next(err);
				});

	});


	// Render the view
	view.render('services/bloglist');
	
};