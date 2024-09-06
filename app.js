
const express=require('express');
const app=express();
const port=8080;
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const path=require('path');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utlis/ExpressError');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user')



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
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get ("/", (req, res) =>{
    res.send("i am root");
});




const sessionOption = {
    secret : "secret",
    resave: false,
    uninitialized: true,

};

app.use(session(sessionOption));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error() = req.flash("error");
    next();
})

// app.get("/demouser", async(res,req) => {
//     let fakeuser= new user({
//         email: "student@gmail.com",
//         username: "delta-student",
//     });
//    let registereduser =  user.register(fakeuser,"helloworld");
//    responce.send("registereduser");
// });

app.use('/listings',listingRouter);
app.use("/listings/:id/reviews", reviews);

app.listen(8080, () => {
console.log("server is listening to port 8080");
});






