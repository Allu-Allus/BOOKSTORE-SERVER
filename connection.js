// import mongoose
const mongoose = require("mongoose")

const connectionString = process.env.DATABASE

// CONNECTION

mongoose.connect(connectionString).then(()=>{
    console.log(`mongoDb connected successfully`);
    
}).catch((err)=>{
    console.log(`mongodb connection failed :${err}`);
    
})