const Joi  = require("joi");
const review = require("./models/review");
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        desciption :Joi.string().required(),
        location :Joi.string().required(),
        price :Joi.number().required().min(0),
        Image :Joi.string().allow("",null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    reviews :Joi.object({
        rating  :Joi.number().min(1).max(5).required(),
        comment : Joi.string().required()
    }).required(),
});