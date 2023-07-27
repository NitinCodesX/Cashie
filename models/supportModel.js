const mongoose = require("mongoose");
const supportDataSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: Object,
    },
  },
  {
    timestamps: true, //Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
  }
);

//Bills is the collection name
const Support = mongoose.model("Support", supportDataSchema);
module.exports = Support;
