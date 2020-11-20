//Author: Jonovan Lee
// Product Data page containing information about product name/type, price, and the image of product
var products =
[
    {
        "ramenType": "Shoyu Ramen",
        "price": 10.00,
        "image": "./images/shoyu.jpg"
    },
    {
        "ramenType": "Tonkotsu Ramen",
        "price": 12.00,
         "image": "./images/tonkotsu.jpg"
    },
    {
        "ramenType": "Miso Ramen",
        "price": 10.00,
        "image": "./images/miso.jpg"

    },
    {
    "ramenType": "Kimchi Ramen",
    "price": 10.00,
    "image": "./images/kimchi.jpg"
    },
    {
        "ramenType": "Goma Ramen",
        "price": 12.00,
        "image": "./images/goma.jpg"
        },
];
//Makes sure the products are defined
if (typeof module !='undefined'){
    module.exports.products = products;
}