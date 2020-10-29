attributes  =  "Jonovan;22;22.5;-21.5" ;
var parts = attributes.split(';');
for (i = 0; i < parts.length; i++) {
    console.log(parts[i], typeof parts [i]);
}
console.log(parts.join(','));
