

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mongoose_url = "mongodb://127.0.0.1:27017/waderlust";
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded ({extended : true}));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get ("/", (req, res) =>{
    res.send("i am root");
});
//index route
app.get("/listings", async (req, res) => {
   const alllistings = await Listing.find();
   console.log(alllistings);
   res.render("listings/index.ejs", { alllistings });
});

//new route
app.get("/listings/new" , (req, res) =>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id" , async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/show.ejs", { listing });

 });

//create route
app.post("/listings" , async (req, res) =>{
    const newlisting =new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");

})
//edit route

app.get("/listings/:id/edit", async (req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });

})
//update route
app.get("/listings/:id", async (req , res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...re.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.get("/listing/:id", async (req, res) =>{
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
})

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});