var express = require('express');
var myParser = require("body-parser");
var fs = require('fs');
var data = require('./public/product_data.js')
var products = data.products;
const queryString = require("querystring");
var filename = 'user_data.json';
var qs =  require('querystring');

var express = require('express');
var app = express();
app.use(myParser.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

function isNonNegInt(q, returnErrors = false) {
    errors = [];
    if(q==  '') q = 0;
    if(Number(q)!=q)errors.push('Not a number!');
    if(q<0) errors.push('Negative value!');
    if (parseInt(q)!=q) errors.push('Not an integer!');
    return returnErrors ? errors : (errors.length ==0);
}

if(fs.existsSync(filename)) {
    userid = fs.readFileSync(filename, 'utf-8');
    users_reg_data =JSON.parse(userid);
} else {
    console.log(filename + ' does not exist!');
}

app.post("/process_form", function (request, response, next) {//data from form will become process_form
    //checks for the correct quantities
    let POST = request.body;//hold contens of the body
    console.log(POST);
    var hasValidQuantities = true;// makes hasValidQuantities true
    var hasPurchases = false; //makes numPurchases false
    for (i = 0; i < products.length; i++){//for loop makes products 1
        q = POST['quantity' +i];//assigns q to variable of quantity submitted from the user by the form
        console.log(q);
        if(isNonNegInt(q) == false ) {
            hasValidQuantities = false;
        }
        if (q>0) {
            hasPurchases = true;
        }
    }
    var theQuantityQueryString = queryString.stringify(POST);
    console.log(theQuantityQueryString);
    if(hasValidQuantities == true && hasPurchases == true) {
        response.redirect("./login_display.html?" + theQuantityQueryString);
    }
    else {
        response.redirect('./products_store.html?' + theQuantityQueryString);
    }
});

app.post("/login_form", function (request, response) {
    console.log(request.body);
    var theQuantityQueryString = queryString.stringify(request.query);

    submittedUser = request.body.username;
    submittedPass = request.body.password;
    submitted_Username = request.body.username.toLowerCase();

    if (typeof users_reg_data[submitted_Username] !='undefined') {
        if(users_reg_data[submitted_Username].password == request.body.password) {
            loginFullname = users_reg_data[submitted_Username].name;
            loginEmail = users_reg_data[submitted_Username].email;
            loginUserName = request.body.username;

            request.query.stickFullname = loginFullname;
            request.query.stickEmail = loginEmail;
            request.query.stickUsername = loginUserName;
            theQuantityQueryString = qs.stringify(request,query);
            response.redirect('/invoice.html?' + theQuantityQueryString);
            }else if (users_reg_data[submittedUser].password != request.body.password){
            error ='<font colors="red">Incorrect Password</font>';
            stickInput = submittedUser;
            request.query.LoginError = error;
            request.query.logStickInput = stickInput;
            }
            } else {
                error ="<font color='red'>Invalid Username: </font>" + submitted_Username;
                stickInput = submittedUser;

                request.LoginError = error;
                request.query.logStickInput = stickInput;
            }
            theQuantityQueryString = queryString.stringify(request.query);
            response.redirect("./login_display.html?" + theQuantityQueryString);
});

app.post("/register_form", function (request, response){
    var theQuantityQueryString = queryString.stringify(request.query);

    regInputUser = request.body.username.toLowerCase();
    regInputFullname = request.body.fullname;
    regInputPassword = request.body.password;
    regInputRepPassword = request.body.repeat_password;
    regInputEmail = request.body.email;
    email = request.body.email.toLowerCase();

    if(regInputFullname.length > 30){
        fullnameErrorReg = '<font color="red">Full Name must be 30 characters or less</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[A-Za-z ]+$/.test(regInputFullname))) {
        fullnameErrorReg = '<font color="red">Full Name must be letters only</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else {
        fullnameErrorReg = '';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if(regInputPassword.length < 6){
        passwordErrorReg = '<font color="red">Password must be at least six characters</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputRepPassword != regInputPassword){
        passwordErrorReg = '<font color="red">Password Does Not Match</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else {
        passwordErrorReg = '';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }

    if(typeof users_reg_data[regInputUser] !='undefined'){
        usernameErrorReg = '<font color="red">User already registered</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (!(/^[A-Za-z ]+$/.test(regInputUser))){
        usernameErrorReg = '<font color="red">Username must be characters and numbers only</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail - regInputEmail;
    } else if (regInputUser.length > 10){
        usernameErrorReg = useLong ='<font color"red">Username must be 10 characters or less</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else if (regInputUser.length < 4){
        usernameErrorReg = '<font color="red">Username must be at least four characters</font>';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else {
        usernameErrorReg = '';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }
    if(!(/^[a-zA-Z0-9._]+@[a-zA-Z.]{2,3}$/.test(regInputEmail))){
        emailErrorReg = '<font color ="red">Email is invalid</font';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    } else {
        emailErrorReg ='';
        regIncorrectFullName = regInputFullname;
        regIncorrectUsername = regInputUser;
        regIncorrectEmail = regInputEmail;
    }
    if(fullnameErrorReg == '' && passwordErrorReg == '' && usernameErrorReg == '' && emailErrorReg == ''){
        users_reg_data[InputUser] ={};
        users_reg_data[regInputUser].name = request.body.fullname;
        users_reg_data[regInputUser].password = request.body.password;
        users_reg_data[regInputUser].email = request.body.email;
        fs.writeFileSync(filename. JSON.stringify(users_reg_data));

        request.query.stickFullname = regInputFullname;
        request.query.stickEmail = regInputEmail;
        request.query.stickUsername = regInputUser;
        qString = queryString.stringify(request.query);
        response.redirect("./invoice.html?" + qString);

        console.log(request.body);
    }

    request.query.RegFullnameError = fullnameErrorReg;
    request.query.RegPasswordError = passwordErrorReg;
    request.query.RegUsernameError = usernameErrorReg;
    request.query.RegEmailError = emailErrorReg;

    request.query.stickRegFullname = regIncorrectFullName;
    request.query.stickUsername = regIncorrectUsername;
    request.query.stickEmail = regIncorrectEmail;

    qstring = queryString.stringify(request.query);
    response.redirect("./register_display.html?" + queryString);
});