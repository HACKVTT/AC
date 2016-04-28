'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;
var imagePath = keystone.get('imagePath');
/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	// autokey: { from: 'name', path: 'key', unique: true }

	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	nocreate: true,
	sortable: true,
	track: true	
});

PostCategory.add({
	// name: { type: String, required: true, index: true, initial: true}

	title: { type: String, required: true,  default: '', label: 'Tiêu đề'},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label: 'Trạng thái' },

	image: {
		type: Types.LocalFile,
		dest: imagePath,
		label: 'Ảnh Thumbnail',
		filename: function(item, file){
			return file.originalname.toLowerCase();
		},
	    allowedTypes:['image/jpeg','image/png']
	},
	navigate: { type: Types.Select, options: 'none, Top, Left, Right', default: 'none', index: true, label: 'Vị trí Menu' },

	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 }
	},	
});

PostCategory.relationship({ ref: 'Post', path: 'Post', refPath:'categories'});
PostCategory.defaultColumns = 'title, state|20%, navigate|20%, image|20%';

PostCategory.register();
