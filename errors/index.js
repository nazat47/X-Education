const CustomError=require("./Custom")
const BadRequest =require('./BadRequest')
const NotFound =require('./NotFound')
const Unauthorized =require('./Unauthorized')
const Unauthenticated =require('./Unauthenticated')
module.exports={BadRequest,NotFound,Unauthorized,Unauthenticated,CustomError}