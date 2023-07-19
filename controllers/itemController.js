const itemModel = require("../models/itemModel");

const getItemController = async (req, res) => {
  try {
    console.log("1->> ********************");
    const items = await itemModel.find();
    console.log("2->> ********************");
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};

const addItemController = async (req, res) => {
  try {
    //creating new Item
    const newItem = new itemModel(req.body);
    //Waiting to save the itemm
    await newItem.save(); //new Item is the instance, it is saving the reference for itemModel, so it will be saved accordingly
    res.status(201).send("Item created successfully");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports = { getItemController, addItemController };
