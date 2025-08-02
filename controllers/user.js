const User = require("../models/user");

module.exports.login = async(req,res)=>{
    let {username} = req.user;
    //console.log(req.user.username);
    req.flash("success",`Welcome back ${username} to Wanderlust`);
    let redirectUrl = res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl);
};
module.exports.signup = async(req,res)=>{
    try{
        let {username , password , email} = req.body;
        const newUser = new User({email,username});
        const registerdUser = await User.register(newUser,password);
        req.login(registerdUser,(err)=>{
            if(err){
                next(err);
            }
        }); 
        req.flash("success","SignUp Succesfull");
        res.redirect("/login");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listing");
    })
}
module.exports.changePassword = async(req ,res)=>{
    try{
        let {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            req.flash("error", "Email not found.");
            return res.redirect("/changePassword");
        }
        await user.setPassword(password);
        await user.save();

        req.flash("success", "Password updated successfully.");
        res.redirect("/login");
    }
    catch (err) {
        console.error("Error changing password:", err);
        req.flash("error", "Something went wrong.");
        res.redirect("/changePassword");
    }
};

