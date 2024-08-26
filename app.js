require("dotenv").config();
const express=require('express');
const bodyParser=require('body-parser');
const db=require(__dirname + "/modules/db.js");
const upload=require(__dirname+ "/modules/uploadModel.js");
const path = require('path');


const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('uploads'));


app.get("/", function(req,res){
    db.ItemsShowCase.find().then((items)=>{
        const rentals = items.filter(item => item.category === 'rental');
        const forSale = items.filter(item => item.category === 'sale');
        const others = items.filter(item => item.category === 'others');
        res.render('index.ejs',{rentals:rentals,forSale:forSale,others:others});
    }).catch((e)=>{
        console.log(`${e} error in root router`)
    });
    
})

app.get("/rentals",function(rewq,res){
 db.ItemsShowCase.find().then((items)=>{
    const rentals = items.filter(item => item.category === 'rental'); 
    res.render('viewPostList.ejs',{title:"Nyumba za Kupanga na vyumba",items:rentals.reverse(),item:"rent"});
 }).catch((e)=>{
    console.log(`${e} error in postsList router`)
});
});

app.get("/forSale",function(rewq,res){
    db.ItemsShowCase.find().then((items)=>{
       const forSale = items.filter(item => item.category === 'sale'); 
       res.render('viewPostList.ejs',{title:"Nyumba za Kuuza na viwanja",items:forSale.reverse(),item:"sale"});
    }).catch((e)=>{
       console.log(`${e} error in postsList router`)
   });
   });

 app.get("/explore/:itemId",function(req,res){
  const id=req.params.itemId;
  db.ItemsShowCase.findById(id).then((item)=>{
    
   res.render("exploreItem.ejs",{item:item})
  }).catch((e)=>{
    console.log(`${e} error in explore one item route`)
  });
 });  

app.get('/compose',function(req,res){
    res.render('composeAnItem.ejs' );
})
 // saving data into db

 app.post('/compose', upload.upload, async (req, res) => {
    try {
      const {
        title,
        price,
        rooms_number,
        city,
        district,
        ward,
        street,
        master_bed_rooms,
        category,
        description,
        mobile_number,
  whatsapp_number,
      } = req.body;
  
      // Check if at least 4 images were uploaded
      if (req.files.length < 4) {
        return res.status(400).json({ error: 'At least 4 images are required.' });
      }
  
      // Collect the image URLs
       const imageUrls = req.files.map(file => {
        // Get the relative path by removing the absolute part of the path
        
        let fileName = file.filename;
        
        
        return fileName;  // filename path in the database
    });
    
  
      // Create a new property
      const newProperty = db.ItemsShowCase({
        title,
        price,
        rooms_number,
        city,
        district,
        ward,
        street,
        master_bed_rooms,
        imageUrls,
        category,
        description,
        mobile_number,
  whatsapp_number,
      });
  
      // Save the property to the database
      await newProperty.save();
      res.status(201).json({ message: 'Property created successfully', property: newProperty });
  
    } catch (error) {
      console.error('Error creating property:', error);
      res.status(500).json({ error: 'An error occurred while creating the property', });
    }
  });
  
  
 
app.listen(3000,()=>{
    db.connectToDb();
    console.log("listen to port 3000 from sweethome");
    
    
})


