const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isOwner,isLoggedIn,validateListing} = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
    .get(wrapAsync(listingControllers.index))
    //create route
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControllers.createListing)
    );
router.get("/new",isLoggedIn,(listingControllers.newListing));

router.route("/:id")
    .put(isOwner,isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingControllers.updateListing))
    //delete route
    .delete(isOwner,isLoggedIn,wrapAsync(listingControllers.deleteListing))
    //Show Route
    .get(wrapAsync(listingControllers.showListing));
//edit route
router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(listingControllers.editListing));
module.exports = router;