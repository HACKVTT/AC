// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

var uploadedRootFolder = 'user-data';
keystone.init({

	'name': 'ketoanac',
	'brand': 'Kế Toán A&C',
	
	'sass': 'public',
	'static': ['public', uploadedRootFolder],
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'emails': 'templates/emails',
	'uploadedRootFolder': uploadedRootFolder, //NauKeystone
	'imagePath': uploadedRootFolder + '/images',	
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.


// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.


// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'GIỚI THIỆU': 'intros',
	'DỊCH VỤ': ['services-categories', 'services'],
	'HỎI ĐÁP': 'faqs',
	'THÀNH VIÊN': 'users',
	'TIN TỨC THUẾ': ['posts', 'post-categories'],
	'LIÊN HỆ': 'enquiries',
	'CÀI ĐẶT': 'configs',
	'galleries': 'galleries'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
