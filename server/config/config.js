var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://cminicus:multivision@ds031213.mongolab.com:31213/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}