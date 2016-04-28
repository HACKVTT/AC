var keystone = require('keystone');
var Types = keystone.Field.Types;
var imagePath = keystone.get('imagePath');
// var React = require('react');

/**
 * Service Model
 * ==========
 */

var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	sortable: true,
	track: true
});

Service.add({
	title: { type: String, required: true, label:'Tiêu Đề' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label:'Trạng Thái' },
	author: { type: Types.Relationship, ref: 'User', index: true, label:'Viết bởi' },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: 'Ngày phát hành' },
	showHome: { type: Types.Select, options: 'normal, feature', default: 'normal', index: true, label:'Trạng thái nổi Bật' },
	cateservice: { type: Types.Relationship, ref: 'ServicesCategories', many: false, label: 'Chuyên mục' },
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
		brief: { type: Types.Html, wysiwyg: true, height: 150, label: 'Mô tả ngắn' },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label: 'Nội dung' }
	}
	
});

// Service.schema.virtual('content.full').get(function() {
// 	return this.content.extended || this.content.brief;
// });

Service.defaultColumns = 'title, state|10%, cateservice|20%, showHome|10%, publishedDate|10%';
Service.register();
