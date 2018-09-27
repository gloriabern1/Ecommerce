var Subcategory = require('../Models/SubCategory');
var Category = require('../Models/Category');
var Brand = require('../Models/Brand');
var Item = require('../Models/Items');
var ItemImages = require('../Models/ItemImages');
var async = require('async');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.Product_List_Index = function (req, res, next) {
    
    Item.find({"Isactive":true}).
    populate('Categoryid').
    populate('Subcategoryid').
    populate('Brandid').
    populate('ItemPictures').
    exec(function (err, SubCategory_list) {
      if (err) { return next(err); }
      //Successful, so render
      var newproduct=Get_latest_Product();
      res.render('index', { title: 'Admin page', details: SubCategory_list, latestproduct : newproduct});
    });
};


exports.Get_Filtered_Product=function(req, res, next){
  
  var PerPage=9
  var Page= req.params.Page || 1
  Item.find({ "Isactive": true })
    .populate('Categoryid')
    .populate('Subcategoryid')
    .populate('Brandid')
    .populate('ItemPictures')
    .skip((PerPage * Page) - PerPage)
    .limit(PerPage)
    .exec(function  (err, Product_List) {
      if (err) { return next(err); }
      Item.count().exec(function(err, count){
        if (err) { return next(err); }
      //Successful, so render
     
      res.render('Productsgrid', { 
        title: 'All products',
         Products: Product_List,
         current:Page,
         pages:Math.ceil(count/PerPage)
        });
      });
      
    });
};

exports.Get_Product_Detail=function(req, res, next){

  var productid=req.params.id;

  Item.findById({_id: productid}).
  populate('Categoryid').
  populate('Subcategoryid').
  populate('Brandid').
  populate('ItemPictures').
  exec(function (err, SubCategory_list) {
    if (err) { return next(err); }
    //Successful, so render
    console.log(SubCategory_list);
    console.log(SubCategory_list.ItemPictures[0]);
    res.render('ProductDetail', { title: 'Admin page', details: SubCategory_list});
  });


};

function Get_latest_Product(){
  item.find({"Isactive":true})
    .populate('Categoryid')
    .populate('Subcategoryid')
    .populate('Brandid')
    .populate('ItemPictures').
  sort({$natural:1}).
  limit(4)
  .exec(function (err, Productlist){
    if(err){return next(err);}
     return Productlist;
  })
};