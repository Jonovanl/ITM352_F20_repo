//Author: Jonovan Lee
//About this code: Server processing for e-commerce website

//server loads express not http

var express = require('express'); //uses express
var app = express();//gets express
var myParser = require("body-parser");
var fs = require('fs');
var products = require('./products.json'); //gets stuff from products.json
var filename = 'user_data.json'

var qs = require('querystring'); // allows the quert string to become the info for the invoice

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.get("/get_products", function (request, response) {
    // process_quantity_form(request.body, response);
    response.type('.js');
    console.log(" var products = " + JSON.stringify(products) + ";"); //gets the json string from url
    response.send(" var products = " + JSON.stringify(products) + ";");//sends the json string thru
});

app.use(myParser.urlencoded({extended: true}));

if (fs.existsSync(filename)) {
    stats = fs.statsSync(filename);
    var data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(data);
} else {
    console.log(`ERR: ${filename} does not exist!`);
}

app.post("/login_form", function (req,res) {
    var LogError = [];
    console.log(req.query);
    the_username = req.body.username.toLowerCase();//makese the username lowercase
    if (typeof users_reg_data[the_username] != 'undefined'){
        if (req.body.password == users_reg_data[req.body.username].password) { 
            res.redirect('./invoice.html?' + purchase_qs + `&username=${the_username}`);
    } else {
        LogError.push('Invalid Password');
        console.log(LogError);
        req.query.username = the_username;
        req.query.name = users_reg_data[the_username].name;
        req.query.LogError = LogError.join(';');

    }
} else {
    LogError.push('Invalid Username');
    console.log(LogError);
    req.query.username = the_username;
    req.query.LogError = LogError.join(';')
}

res.redirect('./login.html?' + purchase_qs + qs.stringify(req.query));
});

app.post("/process_register", function (req, res){
    var errors =[];
    var reguser =req.body.username.toLowerCase();

    if(typeof users_reg_data[reguser] != 'undefined'){

        errors.push('Username Taken')
    }
    //Use of only letters for Full Name
    if (/^[A-Za-z]+$/.test(req.body.name)) {
    }
    else {
        errors.push('Use Only Letters for Full Name');
    }
    // validating Full Name
    if (req.body.name == "") {
        errors.push('Invalid Full Name');
    }
    // length of full name is between 0 and 25 
    if ((req.body.fullname.length > 25 && req.body.fullname.length < 0)) {
        errors.push('Full Name Too Long');
    }
    //Makes user use only letters and numbers 
    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
    else {
        errors.push('Letters And Numbers Only for Username')
    }
    //Password character requirement
    if (req.body.password.length < 6) {
        errors.push('Password Too Short')
    }
    // Making sure passwords are the same 
    if (req.body.password !== req.body.repeat_password) {
        errors.push('Password Not a Match')
    }
    //Saves user's registration in user_data.json (Referenced from lab 14) Got assistance from Professor Port during 1on1
    username = req.body.username;
    req.query.username = username;
   purchase_qs = qs.stringify (req.query);
    if (errors.length == 0) {
        POST = req.body
        console.log('no errors')
        users_reg_data[username] = {};
        users_reg_data[username].name = req.body.username;
        users_reg_data[username].password = req.body['password'];
        users_reg_data[username].email = req.body['email'];
        data = JSON.stringify(users_reg_data);
        fs.writeFileSync(filename, data, "utf-8");
        res.redirect('./invoice.html?' + purchase_qs);
    }
    //Keeping user at register page due to error/Logging it in console
     else {
    
        console.log(errors)
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.repeat_password = req.body.repeat_password;
        req.query.email = req.body.email;

        req.query.errors = errors.join(';');
        res.redirect('./register.html?' + purchase_qs);

    }
});

app.post("/process_form", function (request, response, next) {
    //console.log(request.body);  


    // Code from Lab13
    //Validate purchase data. Check each quantity is non negative integer or blank.
    var validqty = true; //Check for valid input. 
    var totlpurchases = false; //Check if there were any inputs and blank.
    for (i = 0; i < products.length; i++) {
        aqty = request.body[`quantity${i}`];

        if (isNonNegIntString(aqty) == false) {
            validqty &= false; //Invalid data 

        }
        if (aqty > 0) { //No input or was left blank.
            totlpurchases = true;
        }
    }

    // Create query string of quantity data for invoice. 
    purchase_qs = qs.stringify(request.body);
    //If data is valid, then send to login. 
    if (validqty == true && totlpurchases == true) {
        response.redirect('./login.html?' + purchase_qs);
    }
    //If data isn't valid reload main page. 
    else {
        response_string = "<script>alert('Error:Please enter valid quantities!'); window.history.back()</script>";
        response.send(response_string);
    }

});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

//Code from by Lab13 and Assignment1 Example
function isNonNegIntString(string_to_check, returnErrors = false) {
    /* This function returns true if string_to_check is a non-negative integer.*/
    errors = []; // assume no errors at first
    if (string_to_check == '') string_to_check = 0;
    if (Number(string_to_check) != string_to_check) { errors.push('Not a number!'); } // Check if string is a number value
    else {
        if (string_to_check < 0) errors.push('Negative value!'); // Check if it is non-negative
        if (parseInt(string_to_check) != string_to_check) errors.push('Not an integer!'); // Check that it is an integer

    }

    return returnErrors ? errors : ((errors.length > 0) ? false : true);
}