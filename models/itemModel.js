const mongoose = require("mongoose");
const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true, //Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
  }
);

//Items is the collection name
const Items=mongoose.model('Items',itemSchema)
module.exports=Items;


