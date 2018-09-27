//add this file to .gitignore so other peeple will not be able to see or google id and secret

module.exports={
    facebookAuth:{
        clientID: '2004354376450108',
        clientSecret: 'ed8e02a4f2c5b3b8ddd8397620684c94',
        callbackUrl: 'http://localhost:3000/Authroute/facebook/callback',
        profileUrl: 'https://graph.facebook.com/v2.5/me?fields=gloria,bernard,gloria_bern@yahoo.com',
        fields:['id', 'emails', 'name']
    },
    twitterAuth : {
        consumerKey      : 'your-consumer-key-here',
        consumerSecret   : 'your-client-secret-here',
        callbackURL     : 'http://localhost:8080/auth/twitter/callback'
    },
    googleAuth:{
        clientID:'77312405309-duq02rffk98hgg19ouhlohut9shsh15r.apps.googleusercontent.com',
        clientSecret:'oKFSIs7mj2igq--DGGr5ZlWR'
    
 },
 mongodb:{
     URI:'mongodb://gloriabernard:x201@ds213759.mlab.com:13759/gg_oauth_db'
 },
 session:{
     cookiekey:'shuihsiushisisfbs'
 }

};