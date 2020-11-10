
var express = require('express'); 
var app = express(); 
var myParser = require("body-parser"); 

// Taken from lab 12 and example 1 assignment 1 from professor port
// ues function ot check if the string is a non-negative integer
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if (q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

// lab 13 example 4
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); // Logs request method and path to the console;
    next();
});

//lab 12 example 4
app.get('/products.html', function (req, res, next) {
    data = require('./public/product_data.js');
    products = data.products;
    if (typeof req.query['purchase_submit'] != 'undefined') {
        console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));// logs current date and ouputs array with inputted data
    }
    next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (req, res) { // post data from the form sent to proces_purchase
    res.send(`got a POST for /process_purchase with data ${JSON.stringify(req.body)} `); // sends response with post confirmation and query string
});

app.use(express.static('./public')); //pulls files from public folder
app.listen(8080, () => console.log('server listening on port 8080')); //listens on port 808 outputs message loggged into console