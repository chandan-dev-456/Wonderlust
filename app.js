if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
const port = process.env.PORT || 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

const listingRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const MONGO_URL = process.env.ATLASDB_URL;

//databases
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then((res)=>{
    console.log("Database Succesfully Connected");
}).catch(err=>{
    console.log(err);
})

const store = MongoStore.create({
    mongoUrl : MONGO_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});
store.on("error",(err)=>{
    console.log("Error in MONGO DB session store" ,err);
});
const sessionOptions = {
    store ,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly :true
    }
}


//Test route---------------------------------
app.get("/",(req,res)=>{
    res.redirect("/listing");
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
app.use("/listing",listingRouter);
app.use("/listing/:id",reviewsRouter);
app.use("/",userRouter);
//-------------------------------------------

app.use((err,req,res,next)=>{
    let{statusCode=500 , message="Something went wrong"} = err;
    res.status(statusCode).render("./listings/error",{err});
    // res.status(statusCode).send(message);
});

app.listen(port,'0.0.0.0',()=>{
    console.log(`Server is listening on port ${port}`);
});

