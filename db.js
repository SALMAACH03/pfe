const mongoose=require('mongoose')

var mongoURL="mongodb+srv://salma:salma@mernapp.geu28zf.mongodb.net/projectPFE"

mongoose.connect(mongoURL,{useunifiedTopology:true,useNewUrlParser:true})
var connection=mongoose.connection
connection.on('error',()=>(
    console.log("mongodb connection failed")
    ))
connection.on('connected',()=>(
    console.log("mongodb connection successful")
))
module.exports=mongoose