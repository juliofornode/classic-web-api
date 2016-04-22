//1. dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');


////custom modules


//2. db connection
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/items041916');

var itemSchema = db.Schema({
    name: String
});

var Item = db.model('Item', itemSchema);


//3. app instantiation
var app = express();


//4. app.set (configuration)
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


//5. app.use (middleware)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));


//6. routes
app.get('/', function(req, res) {
    res.redirect('items');
});


//read all
app.get('/items', function(req, res, next) {
    Item.find(function (error, result) {
            if (error) return next(error);
            res.render('items', {items: result});
        });
});


//get create page
app.get('/new-item', function(req, res) {
    return res.render('show_edit', {title: 'New Item', item:{}});
});


//create
app.post('/new-item', function(req, res, next) {
    var item = new Item({name: req.body.name});
    item.save(function(error, result) {
        if (error) return next(error);
        console.log('Saving: ' + result);
        return res.redirect('/items');
    });
});


//read one
app.get('/item/:id', function(req, res) {
    var id = req.params.id;
    Item.findById(id, function(err, item){
        if (err)
            console.log(err);
        return res.render('show_edit', {title: 'Show Item', item: item});
    });
});


//update one
app.post('/item/:id', function(req, res, next) {
    var id = req.params.id;
    Item.findById(id, function(err, item){
        item.name = req.body.name;
        item.save(function(error, result) {
            if (error) return next(error);
            console.log('Updating: ' + result);
            return res.redirect('/items');
        });
    });
});


//delete one
app.get('/delete-item/:id', function(req, res, next){
    var id = req.params.id;

    Item.findById(id, function(err, item){
        if (err)
            console.log(err);
        if (!item)
            return res.send("Invalid ID");

        item.remove(function(err){
            if (err)
                console.log(err);
            return res.redirect("/items");
        });
    });
});


////catch-all route
app.all('*', function(req, res) {
    res.status(404).send('this is the 404 Error message.');
});


//7. app server start in host and port
app.listen(3000, function() {
    console.log('the server is listening on port 3000');
});