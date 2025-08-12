const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/user");
const {isOwner,isLoggedIn,validateListing,saveredirectUrl} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/profile", isLoggedIn)
    .get((req, res) => {
        res.render("./users/profile", { currentUser: req.user });
    })
    .post(isLoggedIn, upload.single("profile[image]"), wrapAsync(userController.profile));

router.route("/profile/edit")
    .get((req, res) => {
        res.render("./users/editprofile", { currentUser: req.user });
    });

router.route("/signup")
    .get((req,res)=>{
        res.render("./users/signup");
    })
    //signup
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get((req,res)=>{
        res.render("./users/login");
    })
    //login
    .post(saveredirectUrl,
        passport.authenticate(
            'local', 
            { failureRedirect: '/login' ,failureFlash : true}
        ),
        wrapAsync(userController.login)
    );

router.get("/logout",userController.logout);

router.route("/changePassword")
    .get((req,res)=>{
        res.render("./users/newPassword");
    })
    .post(wrapAsync(userController.changePassword));

module.exports = router;