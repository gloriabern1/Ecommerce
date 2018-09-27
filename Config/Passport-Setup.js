var passport = require('passport');
var User= require('../Models/User');
var LocalStrategy= require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var keys=require('./Key');

module.exports=function(passport){
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },

  function(req, email, password, done){
    process.nextTick(function(){

      User.findOne({'local.email' : email }, function(err, user){
        if(err) return done(err);
        if(user){
          return done(null, false, req.flash('signupMessage', 'That email is already taken. '));
        } else {
          var newUser= new User();
          newUser.local.email= email;
          newUser.local.password= newUser.generateHash(password);

          newUser.save(function(err){
            if(err)
            throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
    function(req, email, password, done){
      console.log("hmm its late");
      User.findOne({'local.email' : email}, function(err, user){
       console.log(user);
      
        if(err) console.log(err);

        if(!user)
        return done(null, false, req.flash('Loginmessage', 'No user found'));

        if(!user.validPassword(password))
           return done(null, false, req.flash('LoginMessage', 'Oops1 Wrong Password'));
          return done(null, user);
          });
    }));

    passport.use(new FacebookStrategy({

      clientID : keys.facebookAuth.clientID,
      clientSecret: keys.facebookAuth.clientSecret,
      callbackURL: keys.facebookAuth.callbackUrl
    },
    
    function(token, refreshToken, profile, done){
      console.log(profile);
      process.nextTick(function(){
        User.findOne({ 'facebook.id' : profile.id}, function(err, user){
          if(err) return done(err);

          console.log(profile)
          if(user){
            return done(null, user);
          }
          else{
            var newUser= new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;

            newUser.save(function(err){
              if(err)
              throw err;

              return done(null, newUser);
            });
          }
        });
      });
    }));


};


