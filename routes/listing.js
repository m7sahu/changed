
const express = require("express");
const router = express.router();
const Listing = require("../models/listing.js");
const Wrapasync = require("../utils/wrapAsync.js");
const { listingschema, reviewschema} = require("../schema.js");
const Expresserror = require("../utils/wrapAsync.js");
const isLoggedIn = require("../middleware.js");


const validatelisting = (res,req,next) =>{
    let{error} = listingschema.validate(req.body);
    if (error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(400, errmsg);

    }else{
        next();
    }
};



//index route
router.get("/", async (req, res) => {
    const alllistings = await Listing.find();
    console.log(alllistings);
    res.render("listings/index.ejs", { alllistings });
 });
 
 //new route
 router.get("/new" , isLoggedIn, (req, res) =>{
   
     res.render("listings/new.ejs");
 });
 
 //show route
 router.get("/:id" , async (req, res) => {
 
     let { id } = req.params;
     const listing = await Listing.findById(id).populate("reviews"); 
     if(!listing){
        req.flash("error","listing does not exist ");
        res.redirect("/listings");
     }
     res.render("listings/show.ejs", { listing });
 
  });

//create route
router.post("/",validatelisting,isLoggedIn ,Wrapasync (async (req, res, next) =>{
    const newlisting =new Listing(req.body.listing);
    await newlisting.save();
    req.flash("success","new listing created");
    res.redirect("/listings");

}));

  //edit route

router.get("/:id/edit",isLoggedIn, async (req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });

})
//update route
router.get("/:id",isLoggedIn, async (req , res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...re.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) =>{
    let {id} = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    req.flash("success","new listing deleted");
    res.redirect("/listings");
}));

router.listen(8080, () => {
    console.log("server is listening to port 8080");
});

module.exports = router;
