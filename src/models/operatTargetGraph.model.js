const mongoose = require("mongoose")

const operTargetGraphSchema = new mongoose.Schema({
    janInpEft: {type : String },
    febInpEft: {type : String },
    marInpEft: {type : String },
    aprInpEft: {type : String },
    mayInpEft: {type : String },
    junInpEft: {type : String },
    julInpEft: {type : String },
    augInpEft: {type : String }, 
    sepInpEft: {type : String },
    octInpEft: {type : String },
    novInpEft: {type : String },
    decInpEft: {type : String },
    // Cash 
    janInpCash: {type : String},
    febInpCash: {type : String},
    marInpCash: {type : String},
    aprInpCash: {type : String},
    mayInpCash: {type : String},
    junInpCash: {type : String},
    julInpCash: {type : String},
    augInpCash: {type : String}, 
    sepInpCash: {type : String},
    octInpCash: {type : String},
    novInpCash: {type : String},
    decInpCash: {type : String},
    // Credit 
    janInpCredit: {type : String},
    febInpCredit: {type : String},
    marInpCredit: {type : String},
    aprInpCredit: {type : String},
    mayInpCredit: {type : String},
    junInpCredit: {type : String},
    julInpCredit: {type : String},
    augInpCredit: {type : String}, 
    sepInpCredit: {type : String},
    octInpCredit: {type : String},
    novInpCredit: {type : String},
    decInpCredit: {type : String},
    userId : {type : String , required : true}
})

const operTargetGraphModel = mongoose.model("OperTargetGraph",operTargetGraphSchema)

module.exports = operTargetGraphModel