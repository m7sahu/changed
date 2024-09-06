
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const review = require("./review.js");

const listeningschema = new schema({
    title: { type: String, required: true, },
    description: String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type: Schema.Types.objectId,
        ref: "review",
    },],
    owner:{
        type: schema.Types.objectId,
        ref:"user",
    }

});




const listing = mongoose.model("listing", listeningschema);
module.exports = listing;