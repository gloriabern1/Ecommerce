
var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    Name:{type:String , required:true, max:100},
    Description:{type:String, max:400},
    Subcategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
    ItemsInCategory:[{type: Schema.Types.ObjectId, ref: 'Items' }],
    Isactive:{type:Boolean},
    DateCreated:{type:Date},

 });

// Virtual for bookinstance's URL
CategorySchema
.virtual('url')
.get(function () {
  return '/Admin/CategoryDetail/' + this._id;
});
//Export model
module.exports = mongoose.model('Category', CategorySchema);