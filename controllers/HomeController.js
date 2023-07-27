const supportModel = require("../models/supportModel");

const getHomeController= async(req,res)=>{
    try {
        const Support = await supportModel.findOne({
            name:'keystate'
        });
        res.send(Support.value);
      } catch (error) {
        console.log(error);
      }
}

module.exports = { getHomeController };
