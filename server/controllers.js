var pages = require('./pages');

module.exports = {

	indexPage : function index(req, res) {
		res.render('index', {
            pages: pages,
            layout: 'layouts/main'
        });
    },

    calcul : function calcul(req, res) {
        res.render('calculs/'+req.params.pageName, {
            pageName: req.params.pageName,
            layout: 'layouts/calcul'
        });
    }
};