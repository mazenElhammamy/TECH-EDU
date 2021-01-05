const token= require('../helpers/token') 

const verifyUser = async(req,res,next)=>{
   
    const {authorization} = req.headers
    if(authorization){
        try{
            const payload = await token.verify(authorization) // payload ={userId, time}
            req.userId = payload.userId; // token is correct and add userId to request
            next() 
            return // 3shan mykmlsh el function w mby3tsh error tany
        }catch(error){ // if token not correct
            next() 
            return // 3shan mykmlsh el function w mby3tsh error tany
        }
    }
    next(new Error('not verified'))
}
module.exports = verifyUser