
var user = require('../Models/User');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')

exports.User_create_post = [
    // Validate that the name field is not empty.
    body('Firstname', 'Please enter your first Name').isLength({ min: 1 }).trim(),
    body('Lastname', 'Please enter your Lastname').isLength({min:1}).trim(),
    body('username', 'Username is Required').isLength({min:1}).trim(),
    body('useremail', 'Email is Required').isLength({min:1}).trim(),
    body('PhoneNumber', 'Phone Number is Required').isLength({min:1}).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('Firstname').trim().escape(),
    sanitizeBody('Lastname').trim().escape(),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('useremail').trim().escape(),
    sanitizeBody('PhoneNumber').trim().escape(),
    
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Category object with escaped and trimmed data.
                    var NewUser = new user(
                    { 
                        FirstName: req.body.Firstname,
                        LastName:req.body.Lastname,
                        username:req.body.username,
                        password:req.body.password,
                        Email:req.body.useremail,
                        PhoneNumber:req.body.PhoneNumber,
                        Isactive:true,
                        DateCreated:Date.now(),

                        });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log(errors);
            console.log(NewUser);
            res.render('Register', { title: 'Register', errors: errors.array()});
        
            return;
        }
        else {
            // Data from form is valid.
            // Check if Category with same name already exists.
            user.findOne({ 'username': req.body.username })
                .exec( function(err, olduser) {
                     if (err)  { return next(err); }

                     if (olduser) {
                       
                          var errorcheck=[{msg:'This username Alredy Exist'}];
                         console.log(errors.array())
                         // Category exists, redirect to its detail page.
                         res.render('Register', { title: 'Register', errors: errorcheck});
                         
                     }
                     else {

                         NewUser.save(function (err) {
                           if (err) { return next(err); }
                           // Category saved. Redirect to Category detail page.
                           res.render('Productsgrid', {title:'All Products'});
                         });

                     }

                 });
        }
    }

];