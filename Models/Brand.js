
var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema(
  {
    Name:{type:String , required:true, max:100},
    Description:{type:String, max:400},
    ItemsInBrand:[{type: Schema.Types.ObjectId, ref: 'Items' }],
    Isactive:{type:Boolean},
    DateCreated:{type:Date},

  }
);

// Virtual for bookinstance's URL
BrandSchema
.virtual('url')
.get(function () {
  return '/Admin/BrandDetail/' + this._id;
});
//Export model
module.exports = mongoose.model('Brand', BrandSchema);