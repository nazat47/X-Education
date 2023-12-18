const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        required:true,
    },
    topics:{
        type:Array,
        required:true,
    },
    schedule:{
        startDate:{
            type:Date,
            required:true,
        },
        endDate:{
            type:Date,
            required:true,
        },
        classDays:{
            type:Array,
            required:true,
        },
        classTime:{
            type:String,
            required:true,
        },
    },
    userRef:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true});

module.exports = mongoose.model("Course", courseSchema);
