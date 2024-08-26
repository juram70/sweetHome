const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose
    .connect(process.env.DB_URL, { family: 4 })
    .then(() => {
      console.log("connection created");
    })
    .catch((e) => {
      console.log(`there was an error in conecting to db and an error is ${e}`);
    });
}

exports.connectToDb = connectToDb;

// schemas

const itemsShowcaseSchema = mongoose.Schema({
  title: String,
  price:Number,
  rooms_number:Number,
  city:String,
  district:String,
  ward:String,
  street:String,
  master_bed_rooms:Number,
  imageUrls: [],
  category:String,
  description: String,
  mobile_number:String,
  whatsapp_number:String,
  
});
exports.close=mongoose.close;
// models

const ItemsShowCase = mongoose.model("itemsShowcase", itemsShowcaseSchema);


  

  
    exports.ItemsShowCase=ItemsShowCase;


   