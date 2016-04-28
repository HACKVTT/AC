var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Intro Model
 * ==========
 */

var Intro = new keystone.List('Intro', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	nocreate: true,
	track: true
});

Intro.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
});

// Intro.schema.virtual('content.full').get(function() {
// 	return this.content.extended || this.content.brief;
// });

Intro.defaultColumns = 'title, state|20%, publishedDate|20%';
Intro.register();
