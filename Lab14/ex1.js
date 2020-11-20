const fs = require('fs');
const user_data_filename = 'user_data.json';

if(fs.existsSync(user_data_filename)){
var data = fs.readFile(user_data_filename, 'utf-8');
users_reg_data = JSON.parse(data);
//var user_info_file = './user_data.json';
//var data = fs.readFileSync(user_info_file, 'utf-8');

userdata = JSON.parse(data);

if(typeof users_reg_data['itm352'] !='undefined'){
    console.log(users_reg_data['itm352']['password']=='xxx');
    }
} else {
    console.log(`ERR: ${user_data_filename} does not exist!!!`);
}