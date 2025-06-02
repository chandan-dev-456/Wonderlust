const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {validateReview,isLoggedIn} = require("../middleware.js");
const listingControllers = require("../controllers/review.js");

//add reviews
router.post("/reviews",isLoggedIn,validateReview,wrapAsync(listingControllers.addReview));
//delete review
router.delete("/reviews/:reviewId",isLoggedIn,wrapAsync(listingControllers.deleteReview));

module.exports = router;