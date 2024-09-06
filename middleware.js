
module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.authenticated()){
        req.session.redirectUrl = req.originalurl;
        req.flash("error","not logged in");
        res.redirect("/login");
    }
    next();
};



module.save.redirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.local.redirectUrl = req.session.redirectUrl;
    }
    next();
};