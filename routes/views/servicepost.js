var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	

	locals.filters = {
		category: req.params.cateservice,
		post: req.params.post
	};
	// Init locals
	locals.section = locals.filters.category;
	locals.data = {
		posts: []
	};

	locals.text = 'Hello';

	// Load the current post
	view.on('init', function(next) {
		console.log('======locals.filters.post====', locals.filters.post);
		var q = keystone.list('Service').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('categories');
		
		q.exec(function(err, result) {
			locals.data.post = result;
			console.log('result', result);
			next(err);
		});
		
	});
	
	// Load other posts
	// view.on('init', function(next) {
		
	// 	var q = keystone.list('Service').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		
	// 	q.exec(function(err, results) {
	// 		locals.data.posts = results;
	// 		next(err);
	// 	});
		
	// });
	
	// Render the view
	view.render('services/blog');
	
};
