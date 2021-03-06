var fs = require('fs');
var user_info_file = './user_data.json';
var userdata = fs.readFileSync(user_info_file, 'utf-8');
var express = require('express');
var app = express();
var myParser = require("body-parser");

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form

 });


if (fs.existsSync(user_info_file)){
    var file_stats = fs.statSync(user_info_file);
    var data = fs.readFileSync(user_info_file, 'utf-8');
    var userdata = JSON.parse(data);
    /*username = 'newuser';
    userdata[username] = {};
    userdata[username].password = 'newpass';
    userdata[username].email = 'newuser@user.com';*/

    fs.writeFileSync(user_info_file, JSON.stringify(userdata));

    console.log(userdata); 
    console.log(`${user_info_file} has ${file_stats.size} characters`);

} else { 
    console.log ("hey!" + user_info_file + "doesn't exist");
}
    



app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body, userdata);
    login_username = request.body.username;
    // checks if username exists in reg data. if so, check if password is correct
    if (typeof userdata[login_username] !='undefined') {
        //checks if password stored for username matches what user typed in
        if (userdata[login_username].password == request.body.password) {
            response.send(`${login_username} is logged in`);
        }  else {
            response.redirect('/login');
        }
    } 
});


app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form
    console.log(request.body);
    username = request.body.username;
    errs = [];
    
    //check if username is taken
    if (typeof userdata[username] != 'undefined') {
        errs.push("username taken");
    } else {
         userdata[username] = {};
    }
    //is pass same as repeat pass
    if (request.body.password != request.body.repeat_password) {
        errs.push("passwords don't match");
    } else {
        userdata[username].password = request.body.password;
    } 
    userdata[username].email = request.body.email;
    console.log(errs);
    if (errs.length == 0) {
        fs.writeFileSync(user_info_file, JSON.stringify(userdata));
        response.redirect(`./login`);
    } else {
        response.end(JSON.stringify(errs));
    }
});


app.listen(8080, () => console.log(`listening on port 8080`));