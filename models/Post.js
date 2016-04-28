var keystone = require('keystone');
var Types = keystone.Field.Types;
var imagePath = keystone.get('imagePath');

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	sortable: true,
	track: true	
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: {
		type: Types.LocalFile,
		dest: imagePath,
		label: 'Ảnh Thumbnail',
		filename: function(item, file){
			return file.originalname.toLowerCase();
			
		},
	    allowedTypes:['image/jpeg','image/png']
	},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
