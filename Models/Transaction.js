var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = new Schema(
  {
    TotalPrice:{type:String , required:true, max:100},
    Status: {type: String, required: true, enum: ['Checked-Out', 'Delivered', 'Closed'], default: 'Checked-Out'},
    Token:{type: String, required:true },
    Isactive:{type:Boolean},
    DateCreated:{type:Date, default:Date.now},

  }
);

//Export model
module.exports = mongoose.model('Transaction', TransactionSchema);

//Some virtual property function will be wriiten here