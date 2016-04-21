//1. dependencies
var express = require('express');
var bodyParser = require('body-parser');


////custom modules


//2. db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restApi041916');

var itemSchema = mongoose.Schema({
    name: String
});

var Item = mongoose.model('Item', itemSchema);


//3. app instantiation
var app = express();


//4. app.set (configuration)
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//5. app.use (middleware)


//6. routes
app.get('/', function(req, res) {
    res.render('index');
});


app.get('/items', function(req, res, next) {
    Item.find()
        .exec(function(error, result) {
            if (error) return next(error);
            res.render('items', {locals: {
                items: result
            }});
});

app.post('/items', function(req, res) {
    var item = new Item({name: req.body.name});
    item.save(function(error, result) {
        if (error) return next(error);
        return res.redirect('/');
    });
});

app.get('/items/:item_id', function(req, res) {

});

app.put('/items/:item_id', function(req, res) {

});

app.delete('/items/:item_id', function(req, res) {

});



////catch-all route
app.all('*', function(req, res) {
    res.status(404).send('this is the 404 Error message.');
});


//7. app server start in host and port
app.listen(3000, function() {
    console.log('the server is listening on port 3000');
});