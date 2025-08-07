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
        url: "https://www.shutterstock.com/shutterstock/photos/1906669723/display_1500/stock-vector-default-avatar-profile-icon-social-media-user-vector-image-1906669723.jpg",
        filename: "default-profile"
    }
}
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);