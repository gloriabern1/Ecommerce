var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var itemImageSchema = new Schema(
  {

    Itemid: { type: Schema.Types.ObjectId, ref: 'Items' },
   
    ItemPictureUrl:{type:String, required:true},
   
    DateCreated:{type:Date, default:Date.now},

  }
);

//Export model
module.exports = mongoose.model('ItemImages', itemImageSchema);