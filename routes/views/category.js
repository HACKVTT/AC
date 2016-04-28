var keystone = require('keystone');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.filters = {
		category: req.params.category
	};
	// Init locals
	locals.section = locals.filters.category;
	locals.data = {
		posts: [],
		categories: []
	};

	var slugCate = locals.section;
	switch (slugCate) {
		case 'dich-vu-ke-toan':
			locals.data.test = 'dich vu ke toan';
			break;
		case 'dich-vu-giay-phep':
			locals.data.test = 'dich vu giay phep kinh doanh';
			break;
		case 'dich-vu-thue':
			locals.data.test = 'dich vu thue';
			break;			
		default:
			// statements_def
			break;
	}
	
	// Render the view
	view.render('category');
	
};
