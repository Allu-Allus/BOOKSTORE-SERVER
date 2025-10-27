// import mongoose
const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    jobTitle : {
        type : String,
        require : true
    },
    jobLocation : {
        type : String,
        require : true
    },
    jobType : {
        type : String,
        require : true
    },
    salary : {
        type : String,
        require : true
    },
    qualification : {
        type : String,
        require : true
    },
    experience : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    }
})

const jobs = mongoose.model("jobs",jobSchema)
module.exports=jobs