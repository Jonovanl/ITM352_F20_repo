
var express = require('express'); 
var app = express(); 
var myParser = require("body-parser"); 


function isNonNegInt(q, return_errors = false) {
    errors = []; 
    if (q == '') q = 0; 
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); 
    if (q < 0) errors.push('<font color="red">Negative value!</font>'); 
    if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); 
    return return_errors ? errors : (errors.length == 0);
}


app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); 
    next();
});


app.get('/products.html', function (req, res, next) {
    data = require('./public/product_data.js');
    products = data.products;
    if (typeof req.query['purchase_submit'] != 'undefined') {
        console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));
    }
    next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (req, res) { 
    res.send(`got a POST for /process_purchase with data ${JSON.stringify(req.body)} `); 
});

app.use(express.static('./public')); 
app.listen(8080, () => console.log('server listening on port 8080')); 