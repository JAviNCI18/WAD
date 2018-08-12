const express = require('express');
const router = express.Router();
const fs = require('fs');
const productFile = './model/products.json';
var uniqid = require('uniqid');


router.get('/products', (req, res, next) => {
    fs.readFile(productFile, 'utf8', (err, data) => {
        if(err)
          return res.render('error', {title:'Product',msg:'Some error occured in Fetching Products Data'});
        var products = JSON.parse(data);
        res.render('products', {title:'Product',data:products});
    });
});

router.get('/addProduct', (req, res, next) => {
     res.render('addProduct', {title:'Add Product'});
});


router.post('/newProduct', (req, res, next) => {

    // if(req.body.productName === null || req.body.productName == '' ||
    //   req.body.price === null || req.body.price == '' ||
    //   req.body.category === null || req.body.category == '' ||
    //   req.body.image === null || req.body.image == ''
    //   )
    //     return res.status(500).send('Error');

    var newProd  = {
     id : uniqid(),
     productName : req.body.productName,
     price       : req.body.price,
     category    : req.body.category,
     image       : req.body.image
    };

    fs.readFile(productFile, 'utf8', (err, data) => {
       if(err) return res.status(500).send('Error Happened');
       var products = JSON.parse(data);
       products.push(newProd);
       var json = JSON.stringify(products);
       fs.writeFile(productFile, json, 'utf8',(e) => {
           if(e) return res.status(500).send('Error Happened');
           res.send('Success');
       });

    });

});

router.post('/deleteProduct', (req, res, next) => {
    if(req.body.id === null || req.body.id == '' )
        return res.status.send('Error');
    var id = req.body.id;
    fs.readFile(productFile, 'utf8', (err, data) => {
       if(err) return res.status(500).send('Error Happened');
       var products = JSON.parse(data);
       var newProducts = products.filter(product => (product.id != id));
       if(products.length == newProducts.length) return res.status(500).send('No Product was found');
       var json = JSON.stringify(newProducts);
       fs.writeFile(productFile, json, 'utf8',(e) => {
           if(e) return res.status(500).send('Error Happened');
           res.send('Success');
       });

    });
});


router.post('/editProduct', (req, res, next) => {
    if(req.body.id === null || req.body.id == '' )
        return res.status.send('Error');
    var id = req.body.id;
    var productEdit = {
                        id : req.body.id,
                        productName : req.body.productName,
                        price : req.body.price,
                        category : req.body.category,
                        image :req.body.image,
                    };

    fs.readFile(productFile, 'utf8', (err, data) => {
       if(err) return res.status(500).send('Error Happened');
       var products = JSON.parse(data);
       var flag = false;
       var newProducts = products.map(product => {
           if(product.id == id){
               flag = true;
               return productEdit;
           }
           return product;
       });
       if(!flag) return res.status(500).send('No Product was found');

       var json = JSON.stringify(newProducts);
       fs.writeFile(productFile, json, 'utf8',(e) => {
           if(e) return res.status(500).send('Error Happened');
           res.send('Success');
       });

    });
});

module.exports = router;
