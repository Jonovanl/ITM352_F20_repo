//Author: Jonovan Lee
// Product Data page containing information about product name/type, price, and the image of product
var shoyu =
[
    {
        "ramenType": "Shoyu Ramen",
        "price": 10.00,
        "image": "./images/shoyu.jpg"
    },
    ];

var tonkotsu =
    [
    {
        "ramenType": "Tonkotsu Ramen",
        "price": 12.00,
         "image": "./images/tonkotsu.jpg"
    },
    ];

var miso =
    [
    {
        "ramenType": "Miso Ramen",
        "price": 10.00,
        "image": "./images/miso.jpg"

    },
    ];

var kimchi = 
    [
    {
    "ramenType": "Kimchi Ramen",
    "price": 10.00,
    "image": "./images/kimchi.jpg"
    },
    ];

var goma =
    [
    {
        "ramenType": "Goma Ramen",
        "price": 12.00,
        "image": "./images/goma.jpg"
        },
];

var products =
{
    "shoyu": shoyu,
    "tonkotsu": tonkotsu,
    "miso": miso,
    "kimchi": kimchi,

}

//Makes sure the products are defined
if (typeof module !='undefined'){
    module.exports.products = products;
}