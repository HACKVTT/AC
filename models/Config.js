var keystone = require('keystone');
// var Types = keystone.Field.Types;

/**
 * Config Model
 * ==========
 */

var Config = new keystone.List('Config', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort: '-createdAt',
	nocreate: true,
	track: true
});

Config.add({
	title: { type: String, required: true },
	companyname: {type: String, label:'Tên công ty'},
	address: {type: String, label: 'Địa chỉ'},
	phone: {type: String, label: 'Điện thoại'},
	email: {type: String, label: 'Email'},
	slogan: {type: String, label: 'Slogan'}
});

// Config.schema.virtual('content.full').get(function() {
// 	return this.content.extended || this.content.brief;
// });

Config.defaultColumns = 'title, address|20%, phone|10%, email|10%';
Config.register();
