/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');
// var _ = require('lodash');
var keystone = require('keystone');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'Giới Thiệu',		key: 'intro',		href: '/intro' },
		{ label: 'Blog',		key: 'blog',		href: '/blog' },
		{ label: 'Gallery',		key: 'gallery',		href: '/gallery' },
		{ label: 'Contact',		key: 'contact',		href: '/contact' }
	];
	
	locals.user = req.user;

	/* ==========================
	 * Get side bar Left
	 * ============================*/

    var afterFunc = _.after(2, function() {
        next();
    });

	// locals = {
	// 	kaka: 'player',
	// 	sidebarLeftServicePosts: [],
	// 	sidebarLeftServiceCategories: []
	// };


	locals.sidebarLeftServicePosts = [];
	locals.sidebarLeftServiceCategories = [];

	keystone.list('ServicesCategories').model.find({
		state: 'published',
		navigate: 'Left'
	}).exec(function(err, result) {
		locals.sidebarLeftServiceCategories = result;
		console.log('locals.sidebarLeftServiceCategories 1:', locals.sidebarLeftServiceCategories);
		afterFunc();
	});
	var q = keystone.list('Service').model.find({state: 'published'})
											.populate('cateservice')
											.sort('-publishedDate');



	console.log('==========locals.sidebarLeftServiceCategories:', locals.sidebarLeftServiceCategories);
	console.log('locals.sidebarLeftServiceCategories._id:', locals.sidebarLeftServiceCategories._id);

	if (locals.sidebarLeftServiceCategories !== null && locals.sidebarLeftServiceCategories._id) {
		console.log('444444');
		q.where('cateservice') .in([locals.sidebarLeftServiceCategories._id]).exec(function(err, result2) {
			locals.sidebarLeftServicePosts = result2;
			console.log('====Result Post Middle=====:', result2);
			afterFunc();
		});		
	}



	console.log('55555555555');
    afterFunc();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};