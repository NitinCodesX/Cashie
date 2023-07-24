const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean 
    }
  },
  {
    timestamp: true, //Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
  }
);

const Users=mongoose.model('users',userSchema)
module.exports=Users;
