var Category = require('../Models/Category');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Categorys.
// this should display all the categories where active is true but not yet
exports.Category_list = function(req, res) {
    Category.find({"Isactive":true})
    .exec(function (err, Category_list) {
      if (err) { return next(err); }
      //Successful, so render
      console.log(Category_list);
      res.render('AdminViews/ViewCategories', { title: 'Admin page', LIst_Category: Category_list });
    });
};

// Display detail page for a specific Category.
// exports.Category_detail = function(req, res) {
//     res.send('NOT IMPLEMENTED: Category detail: ' + req.params.id);
// };


// Handle Category create on POST.
exports.Category_create_post = [
    // Validate that the name field is not empty.
    body('Categoryname', 'Category name is required').isLength({ min: 1 }).trim(),
    body('Catdescript', 'Category Description is Required').isLength({min:30}).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('Categoryname').trim().escape(),
    sanitizeBody('Catdescript').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Category object with escaped and trimmed data.
                    var category = new Category(
                    { 
                        Name: req.body.Categoryname,
                        Description:req.body.Catdescript,
                        DateCreated:Date.now(),
                        Isactive:true,

                        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log(errors);
            console.log(category);
            res.render('AdminViews/Createcategory', { title: 'Admin Page', Category: category, errors: errors.array()});
        
            return;
        }
        else {
            // Data from form is valid.
            // Check if Category with same name already exists.
            Category.findOne({ 'Name': req.body.Categoryname })
                .exec( function(err, found_Category) {
                     if (err)  { return next(err); }

                     if (found_Category) {
                       
                          var errorcheck=[{msg:'Category Name Alredy Exist'}];
                         console.log(errors.array())
                         // Category exists, redirect to its detail page.
                         res.render('AdminViews/Createcategory', { title: 'Admin Page', Category: category, errors: errorcheck});
                         
                     }
                     else {

                         category.save(function (err) {
                           if (err) { return next(err); }
                           // Category saved. Redirect to Category detail page.
                           res.redirect('/Admin/CategoryList');
                         });

                     }

                 });
        }
    }


];


// Handle Category delete on POST.
exports.Category_delete_post = function(req, res, next) {
    var id=req.params.id;
    Category.findById(id).
    exec(function(err, getcategory){
        if(err){return next(err)}

        getcategory.Isactive=false;
        getcategory.save(function(err){
            if(err) {return next(err)};

            res.redirect('/Admin/CategoryList')
        });
        
    });
};

// Display Category update form on GET.
exports.Category_update_get = function(req, res, next) {

    var id=req.params.id;
    Category.findById(id).
    exec(function(err, getcategory){
        if(err){return next(err)}

        res.render('AdminViews/EditCategories', {title:'Admin page', Categoredit:getcategory})
    });
    
    
};

// Handle Category update on POST.
exports.Category_update_post =[
   // Validate that the name field is not empty.
   body('Categoryname', 'Category name is required').isLength({ min: 1 }).trim(),
   body('Catdescript', 'Category Description is Required').isLength({min:30}).trim(),
   
   // Sanitize (trim and escape) the name field.
   sanitizeBody('Categoryname').trim().escape(),
   sanitizeBody('Catdescript').trim().escape(),

   // Process request after validation and sanitization.
   (req, res, next) => {

       // Extract the validation errors from a request.
       const errors = validationResult(req);

       // Create a Category object with escaped and trimmed data.
                   var category = new Category(
                   { 
                       Name: req.body.Categoryname,
                       Description:req.body.Catdescript,
                       DateCreated:req.body.dateCreated,
                       Isactive:req.body.isactive,
                       _id:req.params.id

                       });


       if (!errors.isEmpty()) {
           // There are errors. Render the form again with sanitized values/error messages.
        
           res.render('AdminViews/EditCategories', { title: 'Admin Page', Categoredit: category, errors: errors.array()});
       
           return;
       }
       else {
           // Data from form is valid.
           // Check if Category with same name already exists.
           Category.findOne({
                        _id:{$ne:req.params.id},
                            'Name': req.body.Categoryname })
                        .exec( function(err, found_Category) {
                                if (err) { return next(err); }

                    if (found_Category) {
                      
                         var errorcheck=[{msg:'Category Name Already Exist'}];
                        console.log(errors.array())
                        // Category exists, redirect to its detail page.
                        res.render('AdminViews/EditCategories', { title: 'Admin Page', Categoredit: category, errors: errorcheck});
                        
                    }
                    else {

                        Category.findByIdAndUpdate(req.params.id, category, {}, function (err) {
                          if (err) { return next(err); }
                          // Category saved. Redirect to Category detail page.
                          res.redirect('/Admin/CategoryList');
                        });

                    }

                });
       }
   }

];