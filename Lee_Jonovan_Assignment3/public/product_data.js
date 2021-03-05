//Author: Jonovan Lee
// Product Data page containing information about product name/type, price, and the image of product
var shoyu =
[
    {
            "product": "Shoyu Ramen",
            "price": 10.00,
            "image": "./images/shoyu.jpg"
        },
        {
            "product": "Spicy Shoyu Ramen",
            "price": 12.00,
            "image": "./images/spicy shoyu.jpg"
        },

        {
            "product": "Large Shoyu Ramen",
            "price": 16.00,
            "image": "./images/large shoyu.jpg"
        },
    
        {
            "product": "Chashu Shoyu Ramen",
            "price": 14.00,
            "image": "./images/chashu shoyu.jpg"
        },

        {
            "product": "Delux Shoyu Ramen",
            "price": 18.00,
            "image": "./images/delux shoyu.jpg"
        },
];

var tonkotsu =
    [
    {
        "product": "Tonkotsu Ramen",
        "price": 12.00,
         "image": "./images/tonkotsu.jpg"
    },


    
    {
        "product": "Spicy Tonkotsu Ramen",
        "price": 13.00,
        "image": "./images/spicy tonkotsu.jpg"
    },
       

    
    {
        "product": "Large Tonkotsu Ramen",
        "price": 18.00,
        "image": "./images/large tonkotsu.jpg"
    },

    {
        "product": "Katsu Tonkotsu Ramen",
        "price": 16.00,
        "image": "./images/katsu tonkotsu.jpg"
    },

    {
        "product": "Gyoza Tonkotsu Ramen",
        "price": 14.00,
        "image": "./images/gyoza tonkotsu.jpg"
    },
];

var miso =
[
    {
        "product": "Miso Ramen",
        "price": 10.00,
        "image": "./images/miso.jpg"

    },

    {
        "product": "Spicy Miso Ramen",
        "price": 12.00,
         "image": "./images/spicy miso.jpg"
    },

    {
        "product": "Large Miso Ramen",
        "price": 12.00,
         "image": "./images/large miso.jpg"
    },

    {
        "product": "Katsu Miso Ramen",
        "price": 12.00,
         "image": "./images/katsu miso.jpg"
    },

    {
        "product": "Gyoza Miso Ramen",
        "price": 12.00,
         "image": "./images/gyoza miso.jpg"
    },

];

var kimchi = 
    [
    {
    "product": "Kimchi Ramen",
    "price": 10.00,
    "image": "./images/kimchi.jpg"
    },
    ];

var goma =
    [
    {
        "product": "Goma Ramen",
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
    "goma": goma

}

//Makes sure the products are defined
if (typeof module !='undefined'){
    module.exports.products = products;
}