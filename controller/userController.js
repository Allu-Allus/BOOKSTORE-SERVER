const users = require("../model/userModel");
const jwt = require("jsonwebtoken")

//register
exports.registerController = async (req, res) => {
    //logic
    const { username, password, email } = req.body
    console.log(username, password, email);

    // res.status(200).json("register request received")

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already exists")
        }
        else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//login

exports.loginController = async (req, res) => {
    const { password, email } = req.body
    console.log(password, email);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.secretKey)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(406).json("Incorrect Credentials")
            }
        } else {
            res.status(403).json("User Doesn't Exist. Please Register")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// google login controller
exports.googleLoginController = async(req,res) => {
    console.log("Inside Google Login Controller");
    const {username, email, password, profile} = req.body
    console.log(username, email, password, profile);
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
             const token = jwt.sign({ userMail: existingUser.email }, process.env.secretKey)
                res.status(200).json({ existingUser, token })
        } else {
             const newUser = new users({
                username,
                email,
                password,
                profile
            })
            await newUser.save()
              const token = jwt.sign({ userMail: existingUser.email }, process.env.secretKey)
                res.status(200).json({ existingUser:newUser, token })
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

// get all users

exports.getAllUserController = async (req, res) => {

    const email = req.payload

    try {
        const AllUsers = await users.find({ email: { $ne: email } })
        res.status(200).json(AllUsers)
    } catch (error) {
        res.status(401).json(error)
    }

}

// update profile controller
exports.updateProfileController = async (req, res) => {
    const userMail = req.payload
    console.log(userMail);
    const{username,password,bio,profile} = req.body
    console.log(username,password,bio,profile);
    pro = req.file? req.file.filename : profile
    
    try {
        const updateProfile = await users.findOneAndUpdate({email:userMail},{
            username : username,
            email : userMail,
            password : password,
            bio,
            profile : pro
        },{new : true}) 
res.status(200).json(updateProfile)
    } catch (error) {
        res.status(500).json(error)

    }
}