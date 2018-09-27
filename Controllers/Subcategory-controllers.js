var Subcategory = require('../Models/SubCategory');
var Category = require('../Models/Category');
var async = require('async');


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.Subcategory_Create_get = function (req, res, next) {
    async.parallel({
        category: function (callback) {
            Category.find(callback);
        }
    }, function (err, result) {
        if (err) { return next(err); }
        console.log(result);
        res.render('AdminViews/Subcategory', { title: 'Admin Page', dropcategory: result.category });
    });
};

exports.Subcategory_list = function (req, res, next) {

    Subcategory.find({ "Isactive": true }).
        populate('Categoryid').
        exec(function (err, SubCategory_list) {
            if (err) { return next(err); }
            //Successful, so render
            console.log(SubCategory_list);
            res.render('AdminViews/Viewsubcategories', { title: 'Admin page', LIst_SubCategory: SubCategory_list });
        });
};


exports.Subcategory_Create_Post = [
    // Validate that the name field is not empty.
    body('dropsubcategoy', 'Please Select Category').isLength({ min: 1 }).trim(),
    body('Subcategoryname', 'Subcategory name is required').isLength({ min: 1 }).trim(),
    body('Subcategorydescript', 'Subcategory Description is Required').isLength({ min: 30 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('dropsubcategoy').trim().escape(),
    sanitizeBody('Subcategoryname').trim().escape(),
    sanitizeBody('Subcategorydescript').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Category object with escaped and trimmed data.
        var newsubcategory = new Subcategory(
            {
                Name: req.body.Subcategoryname,
                Description: req.body.Subcategorydescript,
                Categoryid: req.body.dropsubcategoy,
                DateCreated: Date.now(),
                Isactive: true,

            });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            Category.find({ "Isactive": true })
                .exec(function (err, category_list) {
                    if (err) { return next(err) };
                    res.render('AdminViews/Subcategory',
                        {
                            title: 'Admin Page', Subcategory: newsubcategory,
                            dropcategory: category_list, errors: errors.array()
                        });

                    return;
                });

        }
        else {
            // Data from form is valid.
            // Check if Category with same name already exists.
            Subcategory.findOne({ 'Name': req.body.Subcategoryname })
                .exec(function (err, found_SubCategory) {
                    if (err) { return next(err); }

                    if (found_SubCategory) {

                        var errorcheck = [{ msg: 'SubCategory Name Alredy Exist' }];
                        Category.find({ "Isactive": true })
                            .exec(function (err, category_list) {
                                if (err) { return next(err) };
                                res.render('AdminViews/Subcategory', { title: 'Admin Page', Subcategory: newsubcategory, dropcategory: category_list, errors: errorcheck });

                            });

                        // Category exists, redirect to its detail page.

                    }
                    else {

                        newsubcategory.save(function (err) {
                            if (err) { return next(err); }
                            // Category saved. Redirect to Category detail page.
                            res.redirect('/Admin/SubCategoryList');
                        });

                    }

                });
        }
    }

];

exports.Subcategory_delete_Post = function (req, res, next) {

    var id = req.params.id;
    Subcategory.findById(id).
        exec(function (err, getsubcategory) {
            if (err) { return next(err) }

            getsubcategory.Isactive = false;
            getsubcategory.save(function (err) {
                if (err) { return next(err) };
                res.redirect('/Admin/SubCategoryList')
            });
        });
};

exports.Subcategory_Update_get = function (req, res, next) {
    var id = req.params.id;
    async.parallel({
        GetSubcategory: function (callback) {
            Subcategory.findById(id).exec(callback);
        },
        Category_list: function (callback) {
            Category.find({ "Isactive": true }, callback);
        }
    }, function (err, result) {
        if (err) { return next(err); }
        res.render('AdminViews/EditsubCategories', { title: 'Admin page', Subcategory: result.GetSubcategory, dropcategory: result.Category_list })

    });
};

exports.Subcategory_Update_post = [
    // Validate that the name field is not empty.
    body('dropsubcategoy', 'Please Select Category').isLength({ min: 1 }).trim(),
    body('Subcategoryname', 'Subcategory name is required').isLength({ min: 1 }).trim(),
    body('Subcategorydescript', 'Subcategory Description is Required').isLength({ min: 30 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('dropsubcategoy').trim().escape(),
    sanitizeBody('Subcategoryname').trim().escape(),
    sanitizeBody('Subcategorydescript').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Category object with escaped and trimmed data.
        var newsubcategory = new Subcategory(
            {
                Name: req.body.Subcategoryname,
                Description: req.body.Subcategorydescript,
                Categoryid: req.body.dropsubcategoy,
                DateCreated: req.body.datecreated,
                Isactive: req.body.isactive,
                _id: req.params.id

            });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            Category.find({ "Isactive": true })
                .exec(function (err, category_list) {
                    if (err) { return next(err) };
                    res.render('AdminViews/EditsubCategories',
                        {
                            title: 'Admin Page', Subcategory: newsubcategory,
                            dropcategory: category_list, errors: errors.array()
                        });

                    return;
                });

        }
        else {
            // Data from form is valid.
            // Check if Category with same name already exists.

            Subcategory.findOne({
                _id: { $ne: req.params.id },
                'Name': req.body.Subcategoryname
            })
                .exec(function (err, found_SubCategory) {
                    if (err) { return next(err); }

                    if (found_SubCategory) {

                        var errorcheck = [{ msg: 'SubCategory Name Alredy Exist' }];
                        Category.find({ "Isactive": true })
                            .exec(function (err, category_list) {
                                if (err) { return next(err) };
                                res.render('AdminViews/EditsubCategories', { title: 'Admin Page', Subcategory: newsubcategory, dropcategory: category_list, errors: errorcheck });

                            });

                    }
                    else {

                        Subcategory.findByIdAndUpdate(req.params.id, newsubcategory, {}, function (err) {
                            if (err) { return next(err); }
                            // Category saved. Redirect to Category detail page.
                            res.redirect('/Admin/SubCategoryList');
                        });

                    }

                });
        }
    }
];
