
const express = require("express");
const router = express.router({mergeParams: true});

const Wrapasync = require("../utils/wrapAsync.js");
const { listingschema, reviewschema} = require("../schema.js");
const Expresserror = require("../utils/wrapAsync.js");
const review = require("../models/review.js");


const validatelisting = (res,req,next) =>{
    let{error} = listingschema.validate(req.body);
    if (error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new Expresserror(400, errmsg);

    }else{
        next();
    }
};

//review post route

router.post("/",validateReview,Wrapasync(async(req, res) =>{
    let listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","new review created");
    
    res.redirect(`/listings/${listing._id}`);
}));

///delete review route

router.delete("/:reviewId", Wrapasync(async(req, res) =>{
    let {id , reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","new review deleted");
    res.redirect(`/listings/${id}`);
}));

modules.exports = router;


