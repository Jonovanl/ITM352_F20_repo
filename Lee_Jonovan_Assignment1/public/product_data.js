products =
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
];
if (typeof module !='undefined'){
    module.exports.products = products;
}