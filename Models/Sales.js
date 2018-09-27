var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var SalesSchema = new Schema(
  {
    Userid:{type: Schema.Types.ObjectId, ref: 'Users', required:true },
    itemid:{type: Schema.Types.ObjectId, ref: 'Items', required:true },
    Transactionid:{type: Schema.Types.ObjectId, ref: 'Transaction', required:true },
    Isactive:{type:Boolean},
    DateCreated:{type:Date, default:Date.now},

  }
);

//Export model
module.exports = mongoose.model('Sales', SalesSchema);

//Some virtual property function will be wriiten here