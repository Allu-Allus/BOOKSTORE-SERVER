const { application } = require("express");
const applications = require("../model/applicationModel");

// add application
exports.addApplicationController = async (req, res) => {
    const { jobTitle, fullName, qualification, email, phone, coverLetter } = req.body
    const resume = req.file.filename
    console.log(jobTitle, fullName, qualification, email, phone, coverLetter, resume);

    try {
        const existingApplication = await applications.findOne({ jobTitle, email })
        if (existingApplication) {
            res.status(406).json(`Already Applied`)
        } else {
            const newApplication = new applications({
                jobTitle, fullName, qualification, email, phone, coverLetter, resume
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getAllApplicationController = async (req, res) => {
    try {
        const allApplication = await applications.find()
        res.status(200).json(allApplication)
    } catch (error) {
        res.status(500).json(error)

    }
}