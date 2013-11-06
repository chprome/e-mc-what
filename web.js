/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var connect = require('connect');
var hbs = require('hbs');
var routes = require('./server/routes');

/** 
 * Configuration
 */

hbs.registerPartials(__dirname + '/client/assets/views/partials');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

app.set('views', __dirname + '/client/assets/views');
app.set('view engine', 'hbs');
app.use(express.bodyParser());
app.use(connect.compress());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/client/public', { maxAge: 10000 }));


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

routes(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on http://localhost:'+ port);
});
 
