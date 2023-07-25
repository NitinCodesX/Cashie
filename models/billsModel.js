const mongoose = require("mongoose");
const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    cartItems:{
      type:Array,
      required:true
    }
  },
  {
    timestamp: true, //Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
  }
);

//Bills is the collection name
const Bills=mongoose.model('Bills',billSchema)
module.exports=Bills;


