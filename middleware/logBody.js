const logBody=(req,res,next)=>{
    console.log("BODY:",req.body);
    console.log("params",req.params);
    next()
}

module.exports = {logBody}