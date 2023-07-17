//Since, initially, our database is empty, we are adding some items into the database, we can run it using "node seeder.js"
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const connectDb=require('./config/config')
const ItemModel=require('./models/itemModel')
const items=require('./utils/data')

dotenv.config()
connectDb()

//function seeder
const importData=async()=>{
    try{
        await ItemModel.deleteMany()
        const itemsData=await ItemModel.insertMany(items)
        console.log('All items added');
        process.exit();
    }catch(error){
        console.log(`${error}`)
        process.exit(1)
    }
}
importData();