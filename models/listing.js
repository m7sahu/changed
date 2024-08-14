
const mongoose = require("mongoose");
const schema = mongoose.Schema;

 const listeningschema = new schema({
    title: { type: String, required: true,},
    description: String,
    Image: { type: String, 
        set: (v) => v ==="" ? "https://www.google.com/search?q=image&sca_esv=06845c31f6bc343b&sca_upv=1&rlz=1C1CHBD_enIN911IN911&sxsrf=ADLYWIJVMmEYzxsbO4hEeb4h7SSsMvEKhA:1721830909916&udm=2&source=iu&ictx=1&vet=1&fir=B_ypq20yGKrazM%252C6dhDHhJGcmvL6M%252C%252Fm%252F0jg24%253BsKMM4eBjWSQEBM%252CB51x0PBR9KNzvM%252C_%253BD2e1clQQJsbJwM%252C-t22bY2ix3gHaM%252C_%253BASMDFNsL7Vw1YM%252CbKJ3gdlWTtaNoM%252C_%253BKZO3nW5sYR2QfM%252CPwAbZUQYX-g-lM%252C_%253BCngZjJWulfoSoM%252CQooZsUX3wOLfLM%252C_&usg=AI4_-kRox-8kkZ9NeQL0ScRbthl5oz4-4w&sa=X&ved=2ahUKEwidxP7977-HAxUTRmcHHSYGDfIQ_B16BAgzEAE#vhid=B_ypq20yGKrazM&vssid=mosaic" : v,},
    price: Number,
    location: String,
    country: String,

 });

 const listing = mongoose.model("listing", listeningschema);
 module.exports = listing;

