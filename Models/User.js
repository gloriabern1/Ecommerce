var mongoose=require('mongoose');
var Schema= mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

//creating the schema 
var userSchema= new Schema({
    username:{type:String},
    local: { email: String, password:String},
    facebook: {id:String, token: String, name: String, email: String},
    twitter : {id: String, token:String, displayname: String, username: String},
    google: {id:String, token: String, email:String, name:String }
    // Facebookid:String,
    // Password:String,
    // Email:{type:String},
    // PhoneNumber:String,
    // Isactive:{type:Boolean},
    // DateCreated:{type:Date, default:Date.now},

});

userSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password, this.local.password);
};

//creating the model
var User= mongoose.model('user', userSchema);

module.exports=User;