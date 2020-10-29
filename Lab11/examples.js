age = 22;
name ="Jonovan";
attributes = name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
parts = attributes.split(';');
for(part of parts){
    console.log(`${part} is a ${typeof part}`);
}
console.log(typeof parts);