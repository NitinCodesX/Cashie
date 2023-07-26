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
    ItemsInCart:{
      type:Array,
      required:true
    },
    date:{
      type:Date,
      required:true
    }
  },
  {
    timestamp: true,
  }
);

//Bills is the collection name
const Bills=mongoose.model('Bills',billSchema)
module.exports=Bills;


