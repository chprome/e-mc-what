var pages = require('./pages');

module.exports = {

	indexPage : function index(req, res) {
		res.render('index', {
            pages: pages,
            layout: 'layouts/main'
        });
    },

    calcul : function calcul(req, res) {

        var matchingPages = pages.filter(function (element) {
            return element.name === req.params.pageName;
        });

        if(matchingPages.lentgh === 0) {
            res.send('Not found', 404);
        } else {
            var page = matchingPages[0];
            res.render('calculs/'+req.params.pageName, {
                pageName: page.name,
                title: page.title,
                layout: 'layouts/calcul'
            });
        }

    }
};