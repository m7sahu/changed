
const express = require("express");
const app = express();
const user = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");


app.use(session({secret:"mysupersecretstring", resave: false, saveUninitialized: true}));

// app.get("/reqcount", (req, res) =>{
//     if (req.session.count){
//         req.session.count++
//     }else{
//         req.session.count = 1;
//     }
//  res.send(`you sent a request x times`);
// });

// app.get("/test", (req,res) =>{
//     console.log("sucess");
// });

app.listen(3000, () => {
    console.log("server is listening to port 3000");
});




