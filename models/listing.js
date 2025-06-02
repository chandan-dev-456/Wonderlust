const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const listingSchema = Schema({
    title:{
        type:String,
    },
    description:{
        type:String,  
    },
    image: {
        url: String,
        filename:String,
        // default: "https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA="
    },
    price:{
        type:String, 
        default:1000
    },
    location:{
        type:String,  
    },
    country:{
        type:String
    },reviews :[
        {
            type:Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref : "User"
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;