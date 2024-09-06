
const express = require("express");
const router = express.router();
const user = require("../models/user.js");
const wrapAsync= require("../utils/wrapAsync.js");
const passport =  require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signup", (req,res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapasync(req,res) => {
   try{
    let{username, email, password} = req.body;
    const newUser = new user({email,username});
   const registereduser= await user.register(newUser, password);  
   console.log(registereduser);
   req.login(registereduser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success", "welcome to wanderlust");
   res.redirect("/listings");
   });
   

   } catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
});

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureflash:true}) ,async(req,res)=>{
    req.flash("success","Welcome");
    let redirectUrl = req.session.redirectUrl || "/listings";
    res.redirect(redirectUrl);

});

router.get("/logout",(res,req,next)=>{
    req.logout((err) =>{
        if(err){
           return next(err);
        }
        request.flash("success","logout");
        request.redirect("/listings");

    })
})








module.exports =  router;