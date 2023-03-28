const operTargetGraphModel = require("../models/operatTargetGraph.model")

const createOperTargetGraph = async({
    janInpEft,
    febInpEft,
    marInpEft,
    aprInpEft,
    mayInpEft,
    junInpEft,
    julInpEft,
    augInpEft, 
    sepInpEft,
    octInpEft,
    novInpEft,
    decInpEft,
    // Cash 
    janInpCash,
    febInpCash,
    marInpCash,
    aprInpCash,
    mayInpCash,
    junInpCash,
    julInpCash,
    augInpCash, 
    sepInpCash,
    octInpCash,
    novInpCash,
    decInpCash,
    // Credit 
    janInpCredit,
    febInpCredit,
    marInpCredit,
    aprInpCredit,
    mayInpCredit,
    junInpCredit,
    julInpCredit,
    augInpCredit, 
    sepInpCredit,
    octInpCredit,
    novInpCredit,
    decInpCredit,
    userId
}) => {
    const createOperTarg = await operTargetGraphModel.create({
        janInpEft,
    febInpEft,
    marInpEft,
    aprInpEft,
    mayInpEft,
    junInpEft,
    julInpEft,
    augInpEft, 
    sepInpEft,
    octInpEft,
    novInpEft,
    decInpEft,
    // Cash 
    janInpCash,
    febInpCash,
    marInpCash,
    aprInpCash,
    mayInpCash,
    junInpCash,
    julInpCash,
    augInpCash, 
    sepInpCash,
    octInpCash,
    novInpCash,
    decInpCash,
    // Credit 
    janInpCredit,
    febInpCredit,
    marInpCredit,
    aprInpCredit,
    mayInpCredit,
    junInpCredit,
    julInpCredit,
    augInpCredit, 
    sepInpCredit,
    octInpCredit,
    novInpCredit,
    decInpCredit,
    userId
    })

    return createOperTarg
}

const getOperTargetGraph = async(userId)=>{
    // console.log("userId",userId)
    const getOperation_byUser = await operTargetGraphModel.find({userId :userId})
    return getOperation_byUser
}

module.exports = {
    createOperTargetGraph ,getOperTargetGraph
}