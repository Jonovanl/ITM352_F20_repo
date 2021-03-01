//Author: Jonovan Lee
// Product Data page containing information about product name/type, price, and the image of product
var products =
[
    {
        "product": "Shoyu Ramen",
        "price": 10.00,
        "image": "./images/shoyu.jpg"
    },
    {
        "product": "Tonkotsu Ramen",
        "price": 12.00,
         "image": "./images/tonkotsu.jpg"
    },
    {
        "product": "Miso Ramen",
        "price": 10.00,
        "image": "./images/miso.jpg"

    },
    {
    "product": "Kimchi Ramen",
    "price": 10.00,
    "image": "./images/kimchi.jpg"
    },
    {
        "product": "Goma Ramen",
        "price": 12.00,
        "image": "./images/goma.jpg"
        },
];
//Makes sure the products are defined
if (typeof module !='undefined'){
    module.exports.products = products;
}