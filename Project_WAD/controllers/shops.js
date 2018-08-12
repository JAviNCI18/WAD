const express = require('express');
const router = express.Router();
const fs = require('fs');
const shopFile = './model/shops.json';
var uniqid = require('uniqid');

router.get('/shops', (req, res, next) => {
    fs.readFile(shopFile, 'utf8', (err, data) => {
        if(err)
           return res.render('error', {title:'Shops',msg:'Some error occured in Fetching Products Data'});
        var shops = JSON.parse(data);
        return res.render('shops', {title:'Shops',data:shops});
    });
});

router.get('/addShop', (req, res, next) => {
    return res.render('addShop', {title:'Add Shop'});
});

router.post('/newShop', (req, res, next) => {
    console.log(req.body.shopName);
    // if(req.body.shopName == undefined || req.body.shopName == '' ||
    //   req.body.address == undefined || req.body.address == '' ||
    //   req.body.category == undefined || req.body.category == '' ||
    //   req.body.email == undefined || req.body.email == '' ||
    //   req.body.phone == undefined || req.body.phone == ''
    //   )
    //     return res.status(500).send('Error');

    var newShop  = {
         id : uniqid(),
         shopName : req.body.shopName,
         address  : req.body.address,
         category : req.body.category,
         email    : req.body.email,
         phone    : req.body.phone
    };

    fs.readFile(shopFile, 'utf8', (err, data) => {
       if(err) return res.status(400).send(err);
       var shops = JSON.parse(data);
       shops.push(newShop);
       var json = JSON.stringify(shops);
       fs.writeFile(shopFile, json, 'utf8',(e) => {
           if(e) return res.status(401).send('Error Happened');
           res.send('Success');
       });

    });

});

router.post('/deleteShop', (req, res, next) => {
    if(req.body.id === null || req.body.id == '' )
        return res.status.send('Error');
    var id = req.body.id;
    fs.readFile(shopFile, 'utf8', (err, data) => {
       if(err) return res.status(500).send('Error Happened');
       var shops = JSON.parse(data);
       var newShops = shops.filter(shop => (shop.id != id));
       if(shops.length == newShops.length) return res.status(500).send('No Shop was found');
       var json = JSON.stringify(newShops);
       fs.writeFile(shopFile, json, 'utf8',(e) => {
           if(e) return res.status(500).send('Error Happened');
           res.send('Success');
       });

    });
});

router.post('/editShop', (req, res, next) => {
    if(req.body.id === null || req.body.id == '' )
        return res.status.send('Error');
    var id = req.body.id;
    var shopEdit = {
                        id : req.body.id,
                        shopName : req.body.shopName,
                        address : req.body.address,
                        category : req.body.category,
                        phone :req.body.phone,
                        email : req.body.email
                    };
    var flag = false;
    fs.readFile(shopFile, 'utf8', (err, data) => {
       if(err) return res.status(500).send('Error Happened');
       var shops = JSON.parse(data);
       var newShops = shops.map(shop => {
           if(shop.id == id){
               flag = true;
               return shopEdit;
           }
           return shop;
       });
       if(!flag) return res.status(500).send('No Shop was found');

       var json = JSON.stringify(newShops);
       fs.writeFile(shopFile, json, 'utf8',(e) => {
           if(e) return res.status(500).send('Error Happened');
           res.send('Success');
       });

    });
});

module.exports = router;
