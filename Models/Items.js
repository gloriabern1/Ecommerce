
var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema(
  {
    Name:{type:String , required:true, max:300},
    Description:{type:String, max:400},
    Subcategoryid: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    Categoryid: { type: Schema.Types.ObjectId, ref: 'Category', required:true },
    Quantity:{type:String, required:true},
    Price:{type:String, required:true},
    ItemPictures:[{ type: Schema.Types.ObjectId, ref: 'ItemImages'}],
    Discount:{type:String},
    Brandid:{ type: Schema.Types.ObjectId, ref: 'Brand'},
    ItemType:{type:String, max:200},
    Isactive:{type:Boolean},
    DateCreated:{type:Date, default:Date.now},

  });

//Export model
module.exports = mongoose.model('Items', itemSchema);