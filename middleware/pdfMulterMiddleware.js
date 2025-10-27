const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req, file, callback)=>{
        callback(null, './pdfUploads')
    },
    filename : (req, file,callback)=>{
        callback(null,`resume - ${file.originalname}`)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype == "application/pdf" ){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only accepts PDF files"))
    }
}

const pdfMulterConfig = multer({
    storage,
    fileFilter
})

module.exports = pdfMulterConfig