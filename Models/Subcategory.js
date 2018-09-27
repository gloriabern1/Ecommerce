var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var SubCategorySchema = new Schema(
  {
    Name:{type:String , required:true, max:100},
    Description:{type:String, max:400},
    Categoryid: { type: Schema.Types.ObjectId, ref: 'Category', required:true },
    ItemsInSubCategory:[{type: Schema.Types.ObjectId, ref: 'Items' }],
    Isactive:{type:Boolean},
    DateCreated:{type:Date, default:Date.now},

  }
);

//Export model
module.exports = mongoose.model('SubCategory', SubCategorySchema);