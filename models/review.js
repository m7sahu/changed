
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewschema = new schema({
    title: { type: Number, min: 1, max:5, },
    comment: String,
    createdat: {
        type: Date,
        default: date.now(),},
    price: Number,
    location: String,
    country: String,

});


module.exports = mongoose.model("review", reviewschema);