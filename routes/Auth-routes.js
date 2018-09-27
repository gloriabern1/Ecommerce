const router = require('express').Router();
const passport=require('passport');
// const passport=require('../Config/passport-setup').passport;

//auth logout
router.get('/logout', (req, res)=>{
    //handle with passport
   // res.send('Logging out');
    req.logout();
    res.redirect('/');
})

router.get('/login', function(req, res){
  res.render('Login.ejs', {message : req.flash('loginMessage'), title : 'Login' });
});

router.get('/Register', function(req, res){
  res.render('Register.ejs', {message: req.flash('signupMessage') , title : 'Register new User' });
});

//////// Route for authenticating with facebook

router.get('/facebook', passport.authenticate('facebook', {
  scope : ['email']
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/Authroute/Checkout',
  failureRedirect: '/Authroute/Register'
}));
router.get('/Checkout', isLoggedin, function(req, res){
  
  res.render('Checkout.ejs', { title: 'Gobid Store : Checkout',
    user: req.user
  });
});

router.post('/Register', passport.authenticate('local-signup', {
  successRedirect : '/Authroute/Checkout',
  failureRedirect : '/Authroute/Register',
  failureflash : true
}));



function isLoggedin(req, res, next){
  if(req.isAuthenticated())
  return next();
  res.redirect('/Authroute/Login');
}
//auth with google
router.post('/Login',  passport.authenticate('local-login', { 
  successRedirect: '/Authroute/Checkout',
  failureRedirect : '/Authroute/login',
  failureFlash : true 
}),function(req, res, next){
  console.log("look");
}

);

module.exports=router;