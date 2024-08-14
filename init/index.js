
const mongoose = require("mongoose");
const initdata = require("../init/data.js");

const listing = require("../models/listing.js");

const mongoose_url = "mongodb://127.0.0.1:27017/waderlust";

main()
.then(() =>{
    console.log("connected to db");
})
.catch((err) =>{
    console.log(err);
});

async function main (){
    await mongoose.connect(mongoose_url)
}

const initdb = async () => {
    
    let res=await listing.insertMany(initdata.data);
    console.log(await listing.find());
    console.log("data was initialized");
}

initdb();