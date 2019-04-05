
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

exports.Item_Create_get = function (req, res, next) {
    async.parallel({
        category: function (callback) {
            Category.find({ "Isactive": true }, callback);
        },
        subcategory: function (callback) {
            Subcategory.find({ "Isactive": true }, callback);

        },
        brand: function (callback) {
            Brand.find({ "Isactive": true }, callback);
        }
    }, function (err, results) {
        if (err) { return next(err) };
        res.render('AdminViews/CreateItem', { title: 'Admin Page', categories: results.category, subcategories: results.subcategory, brands: results.brand });

    });

};
exports.Item_Create_Post = [
    (req, res, next) => {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.keepExtensions = true;
        form.uploadDir = path.join('public/images');

  
        form.parse(req, function (err, fields, files) {
            var item = JSON.parse(fields.itemdetails);
            var newitem = new Item(
                {
                    Name: item.PN,
                    Description: item.PD,
                    Subcategoryid: item.SSC,
                    Categoryid: item.SC,
                    Quantity: item.QT,
                    Price: item.PR,
                    ItemPictures: [],
                    Discount: item.DC,
                    Brandid: item.BS,
                    ItemType: item.IT,
                    DateCreated: Date.now(),
                    Isactive: true,
                }
            );
            newitem.save(function (err) {
                if (err) { return callback(err);
                console.log(err); }
                // Category saved. Redirect to Category detail page.
                var itemid = newitem._id;

                var count = 1;
                files.uploads.forEach(file => {
                    console.log("count" + count);
                    var destination = 'public/images/' + itemid + count + '.jpg';
                    var databasedestination='images/' + itemid + count + '.jpg';
                    // if (file.type == 'image/jpeg') {
                    //     destination.concat(".jpg");
                    // } else if
                    // console.log(JSON.stringify(file.toJSON()));
                    fs.renameSync(file.path, destination);
                    var newitemimage = new ItemImages(
                        {
                            Itemid: itemid,
                            ItemPictureUrl: databasedestination,
                            DateCreated: Date.now(),
                        });

                    newitemimage.save().then((newitemimage) => {
                             newitem.ItemPictures.push(newitemimage._id);
                             if(newitem.ItemPictures.length==files.uploads.length){
                                newitem.save().then((newitem) => {
                                });
                             }
                           
                    });

                    count++;

                });
            });
        });


        form.on('error', function (err) {
            console.log('An error has occured: \n' + err);
        });



    }



];

exports.Item_list = function (req, res, next) {


};
exports.Item_list_subcategory = function (req, res, next) {
    var categoryid = req.params.id;
    async.parallel([
        function (callback) {
            return Subcategory.find({ "Isactive": true, "Categoryid": categoryid }).
                populate('Categoryid').
                exec(function (err, SubCategory_list) {
                    if (err) { return next(err); }
                    //Successful, so render
                    console.log(SubCategory_list);
                    return callback(null, SubCategory_list);
                });
        }
    ], function (error, results) {
        console.log(results);
        return res.json(results);
    })

};

exports.Item_delete_Post = function (req, res, next) {

};

exports.Item_Update_get = function (req, res, next) {

};

exports.Item_Update_post = [

];
exports.Items_detail = function (req, res, next) {

};