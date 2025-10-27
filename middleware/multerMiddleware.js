const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req, file, callback)=>{
        callback(null, './imgUpload')
    },
    filename : (req, file,callback)=>{
        callback(null,`image - ${file.originalname}`)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/jpg" ||file.mimetype == "image/png" ||file.mimetype == "image/webp"){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only accepts jpeg, jpg & png files"))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig