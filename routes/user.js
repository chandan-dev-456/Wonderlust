const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware");
const userController = require("../controllers/user");

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