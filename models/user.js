const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email : {
        type: String,
        required :true
    },
    profilePic :{
        type: {
        url: String,
        filename: String
    },
    default: {
        url: "/a4e5acb1-bdf8-4fd7-8854-fe3c43ae51ba.jpeg",
        filename: "default-profile"
    }
}
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);