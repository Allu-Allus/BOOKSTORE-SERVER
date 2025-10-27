// import express
const express = require("express")

// const { registerController } = require("./controller/userController")

const userController = require("./controller/userController")
const { addBookController, homeBookController, getAllBookController, getABookCOntroller, getAllUserAddedBookController, getAllUserBroughtBookController, deleteABookController, getAllBooksAdminController, approveBookController, paymentController } = require("./controller/bookController")
const jwtmiddleware = require("./middleware/jwtMiddleware")
const multerConfig = require("./middleware/multerMiddleware")
const { addJobController, getAllJobController, deleteJobController } = require("./controller/jobController")
const { addApplicationController, getAllApplicationController } = require("./controller/applicationController")
const pdfMulterConfig = require("./middleware/pdfMulterMiddleware")
const jwtMiddleware = require("./middleware/jwtMiddleware")



// instance
const routes = new express.Router()

// path to register a user 
routes.post("/register",userController.registerController)
// routes.post("/register",registerController)

// login
routes.post("/login",userController.loginController)

// google auth login
routes.post('/google-login',userController.googleLoginController)
// ------------------USER------------------------------

routes.post("/add-book",jwtmiddleware,multerConfig.array("uploadImages",3),addBookController)

// get home books
routes.get("/home-books",homeBookController)

// get Allusers books
routes.get("/all-user-books",jwtmiddleware ,getAllBookController)

// get a specificbook
routes.get("/view-book/:id",getABookCOntroller)

// path to get all user added book
routes.get("/all-user-added-books",jwtmiddleware,getAllUserAddedBookController)

// path to get brought by Books
routes.get("/all-user-brought-books",jwtmiddleware ,getAllUserBroughtBookController)

// delete a book
routes.delete("/delete-book/:id",deleteABookController)

//path to add job application
routes.post("/add-application",jwtmiddleware, pdfMulterConfig.single("resume") , addApplicationController)

// payment
routes.put("/make-payment",jwtMiddleware,paymentController)


// ------------------------------------admin-side-------------------------------------------
// get all books
routes.get("/all-books",getAllBooksAdminController)

// approve books
routes.put("/approved-books/:id",approveBookController)

// get all users
routes.get("/all-users",userController.getAllUserController)

// add job
routes.post("/addjob",jwtmiddleware,addJobController)

//get job
routes.get("/all-jobs",getAllJobController)

//delete job
routes.delete("/delete-job/:id",deleteJobController)

// get all job application
routes.get("/all-application",getAllApplicationController)

//update profile
routes.put("/edit-profile",jwtmiddleware,multerConfig.single("adminProfile"),userController.updateProfileController)

// export
module.exports = routes