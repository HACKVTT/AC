var keystone = require('keystone');
var Types = keystone.Field.Types;
var imagePath = keystone.get('imagePath');

/**
 * ServicesCategories Model
 * ==================
 */

var ServicesCategories = new keystone.List('ServicesCategories', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	sortable: true,
	track: true	
});

ServicesCategories.add({
	title: { type: String, required: true,  default: '', label: 'Tiêu đề'},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label: 'Trạng thái' },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: 'Ngày phát hành' },

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

ServicesCategories.relationship({ ref: 'Service', path: 'Service', refPath: 'cateservice' });
ServicesCategories.defaultColumns = 'title, state|10%, publishedDate|20%, navigate|10%';

ServicesCategories.register();