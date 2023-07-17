const mongoose = require("mongoose");

//connectDB Function

const connectDb = async () => {
  return mongoose.connect(process.env.URI).then(() => console.log("Connected To the DB"));
};

module.exports=connectDb;