const Review = require("../models/review");
const Listing = require("../models/listing");
module.exports.addReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.reviews);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" ,"Review added Succesfully");
    res.redirect(`/listing/${listing._id}`);
};

module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" ,"Review deleted succesfully");
    res.redirect(`/listing/${id}`);
};