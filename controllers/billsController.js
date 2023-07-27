const billsModel = require("../models/billsModel");
const supportModel = require("../models/supportModel");

const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};

const addBillsController = async (req, res) => {
  try {
    // Creating a new Item (assuming it's a billsModel)
    const newBill = new billsModel(req.body);
    // Waiting to save the item
    await newBill.save();

    const totalProducts = req.body.ItemsInCart?.reduce(
      (accumulator, item) => accumulator + item.qty,
      0
    );

    const totalIncome = req.body.totalPrice;

    const updatedState = await supportModel.findOneAndUpdate(
      { name: "keystate" },
      {
        $inc: {
          "value.totalProducts": totalProducts,
          "value.totalIncome": totalIncome,
        },
      },
      { new: true }
    );

    if (updatedState) {
      console.log("Updated keystate:", updatedState);
    } else {
      const newState = new supportModel({
        name: "keystate",
        value: {
          totalProducts,
          totalIncome,
        },
      });
      await newState.save();
    }

    res.send("Bill generated successfully");
  } catch (error) {
    res.status(500).send("An error occurred while processing the bill.");
    console.log(error);
  }
};

module.exports = { getBillsController, addBillsController };
