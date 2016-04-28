var keystone = require('keystone');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'hoi-dap';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		faqs: []
	};

	// Load list Faqs
	view.on('init', function(next) {
		
		var q = keystone.list('Faq').model.find().where('state', 'published').sort('-publishedDate');
		
		q.exec(function(err, results) {
			locals.data.faqs = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('faq');
	
};
