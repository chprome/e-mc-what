var pages = require('./pages');
var swig  = require('swig');
var tplRoot = __dirname + '/../client/assets/views/';

module.exports = {

	indexPage : function index(req, res) {
        var template = swig.compileFile( tplRoot + 'index.swig');
        var output = template({
            pages: pages
        });
        res.send(output);
    },

    calcul : function calcul(req, res) {

        var matchingPages = pages.filter(function (element) {
            return element.name === req.params.pageName;
        });

        // TODO extraire la 404
        if(matchingPages[0] === undefined) {
            res.send('Page not found', 404);
        } else {
            var page = matchingPages[0];
            var template = swig.compileFile( tplRoot + 'calculs/'+page.name+'.swig');
            var output = template({
                pageName: page.name,
                title: page.title,
                layout: 'layouts/calcul'
            });
            res.send(output);
        }

    }
};