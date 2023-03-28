const httpStatus = require('http-status')
const createOperTarget = require("../services/operTargetServices")

const operTargetGraph = async(req,res,next)=>{
    const {
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
    } = req.body
    const userId = req.user.id

    const createOperTargetGraph = await createOperTarget.createOperTargetGraph({
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
    res.status(httpStatus.CREATED).send({createOperTargetGraph})
}

const getOper_target = async(req,res,next)=>{
    const userId = req.user.id
    // console.log(userId)
    const getOperTarget = await createOperTarget.getOperTargetGraph(userId)
    res.status(httpStatus.CREATED).send(getOperTarget)
    // res.status(httpStatus.CREATED).send("getoperationTargetGraph")
}
module.exports = {operTargetGraph,getOper_target}