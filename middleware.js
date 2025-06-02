const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const {reviewSchema} = require("./schema");

module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","Please login");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveredirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async(req,res,next)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error","You dont have access")
        return res.redirect(`/listing/${id}`);
    }
    next();
};
module.exports.validateListing= (req,res,next) =>{
    let {err} = Listing.validate(req.body);
    if(err){
        throw new ExpressError(404,err);
    }else{
        next();
    }
};
module.exports.validateReview = (req,res,next) =>{
    let {err} = reviewSchema.validate(req.body);
    if(err){
        throw new ExpressError(404,err);
    }else{
        next();
    }
}