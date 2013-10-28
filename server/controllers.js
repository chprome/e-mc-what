var menuBuilder = require('./utils/menuBuilder');

module.exports = {

	/*
	 * Index
	 */

	indexPage : function index(req, res) {
		menuBuilder(req.app, '/');
		res.render('index');
	}
};