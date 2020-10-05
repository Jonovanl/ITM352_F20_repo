// -- Price depends on quantity
quantity =  27;
//can be any quantity change to test for different answers
if ( ( quantity > 0) && (quantity < 10) ) {
    //format either this way or line 8
    price = 100;
}
else if ( quantity >= 10 && quantity < 25) {
    price = 50 ;
}
else if ( quantity >= 25) { 
    price = 35;
        }
else
    price = "no purchase" ;

console.log( quantity + ' products will cost $' + price + ' each.' ) ;
