// import dot env
 require("dotenv").config()//to load environment

//1. import express
const express =require("express")

// 5.import cors
const cors =require("cors")

//8. import router
const routes =require("./router")

// 11.import connection
require("./connection")

// 2.create server
const bookstoreserver = express()

//6. use  cors to connect witth frontend
bookstoreserver.use(cors())

// 7.parse the json data - middleware
bookstoreserver.use(express.json())

// 9.tell server to  use router
bookstoreserver.use(routes)

// get imageUploads
bookstoreserver.use("/upload",express.static("./imgUpload"))

// export pdfUploads
bookstoreserver.use("/pdfupload",express.static("./pdfUploads"))

//3. set port
const PORT = 4000 || process.env.PORT

//4. tell server to listen
bookstoreserver.listen(PORT,()=>{
    console.log(`server running successfully at port : ${PORT}`);
    
})