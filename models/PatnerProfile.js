const mongoose = require("mongoose")

const PatnerProfileSchema= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',rquired:true,unique:true},
    fullName:String,
    services:[String],
    city:String,
    phone:String,
    aadharNumber:String,
    sampleProtfolio:[String],
    status:{
        type:String,
        enum:['pending','verfied','rejected'],
        default:'pending'
    },
    admin:String,

},{timestamps:true});

module.exports = mongoose.model('PartnerProfile',PatnerProfileSchema)