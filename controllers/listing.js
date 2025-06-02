const Listing = require("../models/listing");

module.exports.index = async(req,res)=>{
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs",{allListing});
};

module.exports.newListing = (req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.createListing =async(req,res)=>{
    //const listing = req.body.listing;
    // console.log(req.body); // Should show form data
    // console.log(req.file); // Should show uploaded file
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url : req.file.path , filename : req.file.filename}
    await newListing.save();
    req.flash("success","New Listing created");
    res.redirect("/listing");
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:"author"}).populate("owner");
    console.log(listing);
    if(!listing){
        req.flash("error","can't find the listings");
        return res.redirect("/listing");
    }
    res.render("./listings/show.ejs",{listing});
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","can't find the listings");
        return res.redirect("/listing");
    }
    res.render("./listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send a valid data for listing")
    }
    let{id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        listing.image = {url : req.file.path , filename : req.file.filename}
        await listing.save();
    }
    res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    req.flash("success","Successfull deleted");
    res.redirect("/listing");
}