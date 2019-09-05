var Brand = require('../Models/Brand');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Categorys.
// this should display all the categories where active is true but not yet
exports.Brand_list = function(req, res) {
    Brand.find({"Isactive":true})
    .exec(function (err, brand_list) {
      if (err) { return next(err); }
      //Successful, so render
      console.log(brand_list);
      res.render('AdminViews/ViewBrands', { title: 'Admin page', brand_list: brand_list });
    });
};

// Display detail page for a specific Category.
// exports.Category_detail = function(req, res) { 
//     res.send('NOT IMPLEMENTED: Category detail: ' + req.params.id);
// };


// Handle Category create on POST.
exports.Brand_create_post = [
    // Validate that the name field is not empty.
    body('Brandname', 'Brand name is required').isLength({ min: 1 }).trim(),
    body('Branddescript', 'Category Description is Required').isLength({min:30}).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('Brandname').trim().escape(),
    sanitizeBody('Branddescript').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Category object with escaped and trimmed data.
                    var brand = new Brand(
                    { 
                        Name: req.body.Brandname,
                        Description:req.body.Branddescript,
                        DateCreated:Date.now(),
                        Isactive:true,

                        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log(errors);
            console.log(brand);
            res.render('AdminViews/CreateBrand', { title: 'Admin Page', Brand: brand, errors: errors.array()});
        
            return;
        }
        else {
            // Data from form is valid.
            // Check if Category with same name already exists.
            Brand.findOne({ 'Name': req.body.Brandname })
                .exec( function(err, found_brand) {
                     if (err)  { return next(err); }

                     if (found_brand) {
                       
                          var errorcheck=[{msg:'Brand Name Alredy Exist'}];
                         console.log(errors.array())
                         // Category exists, redirect to its detail page.
                         res.render('AdminViews/CreateBrand', { title: 'Admin Page', Brand: brand, errors: errorcheck});
                         
                     }
                     else {

                         brand.save(function (err) {
                           if (err) { return next(err); }
                           // Category saved. Redirect to Category detail page.
                           res.redirect('/Admin/BrandList');
                         });

                     }

                 });
        }
    }


];


// Handle Category delete on POST.
exports.Brand_delete_post = function(req, res, next) {
    var id=req.params.id;
    Brand.findById(id).
    exec(function(err, getbrand){
        if(err){return next(err)}

        getbrand.Isactive=false;
        getbrand.save(function(err){
            if(err) {return next(err)};

            res.redirect('/Admin/BrandList')
        });
        
    });
};

// Display Category update form on GET.
exports.Brand_update_get = function(req, res, next) {
 console.log(id);
    var id=req.params.id;
    Brand.findById(id).
    exec(function(err, getbrand){
        if(err){return next(err)}
        console.log(getbrand);
        res.render('AdminViews/EditBrands', {title:'Admin page', Categoredit:getbrand})
    });
    
    
};

// Handle Category update on POST.
exports.Brand_update_post =[
   // Validate that the name field is not empty.
   body('Brandname', 'Brand name is required').isLength({ min: 1 }).trim(),
   body('Branddescript', 'Brand Description is Required').isLength({min:30}).trim(),
   
   // Sanitize (trim and escape) the name field.
   sanitizeBody('Brandname').trim().escape(),
   sanitizeBody('Branddescript').trim().escape(),

   // Process request after validation and sanitization.
   (req, res, next) => {

       // Extract the validation errors from a request.
       const errors = validationResult(req);

       // Create a Category object with escaped and trimmed data.
                   var brand = new Brand(
                   { 
                       Name: req.body.Brandname,
                       Description:req.body.Branddescript,
                       DateCreated:req.body.dateCreated,
                       Isactive:req.body.isactive,
                       _id:req.params.id

                       });


       if (!errors.isEmpty()) {
           // There are errors. Render the form again with sanitized values/error messages.
        
           res.render('AdminViews/EditBrands', { title: 'Admin Page', Categoredit: brand, errors: errors.array()});
       
           return;
       }
       else {
           // Data from form is valid.
           // Check if Category with same name already exists.
           Brand.findOne({
                        _id:{$ne:req.params.id},
                            'Name': req.body.Brandname })
                        .exec( function(err, found_Brand) {
                                if (err) { return next(err); }

                    if (found_Brand) {
                      
                         var errorcheck=[{msg:'Brand Name Already Exist'}];
                        console.log(errors.array())
                        // Category exists, redirect to its detail page.
                        res.render('AdminViews/EditBrands', { title: 'Admin Page', Categoredit: brand, errors: errorcheck});
                        
                    }
                    else {

                        Brand.findByIdAndUpdate(req.params.id, brand, {}, function (err) {
                          if (err) { return next(err); }
                          // Category saved. Redirect to Category detail page.
                          res.redirect('/Admin/BrandList');
                        });

                    }

                });
       }
   }

];