const config = require("./config");
const makeRatingFile = require("./rating-file");
const {updateRating, createRating} = require("./calculation");

module.exports = {
    config, 
    makeRatingFile,
    updateRating,
    createRating
}