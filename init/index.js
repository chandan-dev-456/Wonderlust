const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then((res)=>{
    console.log("Succesfully Connected");
}).catch((err)=>{
    console.log(err);
})
const initDB = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner :"68387ddcce2eb74e47ffc491"}));
    await Listing.insertMany(initdata.data);
};
initDB();