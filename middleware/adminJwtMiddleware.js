const jwt = require("jsonwebtoken")

const jwtAdminMiddleware = (req, res, next) => {
    console.log(`inside jwt middleware`);
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, process.env.secretKey)
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        if (jwtResponse.userMail == 'bookstoreadmin@gmail.com') {
            next()

        } else {
            res.status(401).json("Invalid user")

        }
    } catch (error) {
        res.status(401).json("Authorization Failed", error)
    }

}

module.exports = jwtAdminMiddleware 