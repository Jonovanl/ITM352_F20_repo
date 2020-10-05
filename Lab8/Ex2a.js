age_count = 1;
age = 22;
while(age_count < age){
    if(age_count >= age/2){
        console.log("I'm Old!");
        break;
    }
    console.log(`age ${age_count}`);
    age_count++;
}
console.log(`Jonovan is ${age_count} years old`)