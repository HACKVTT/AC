var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Faq Model
 * ==========
 */

var Faq = new keystone.List('Faq', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	sortable: true,
	track: true
});

Faq.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
});

// Faq.schema.virtual('content.full').get(function() {
// 	return this.content.extended || this.content.brief;
// });

Faq.defaultColumns = 'title, state|20%, publishedDate|20%';
Faq.register();
