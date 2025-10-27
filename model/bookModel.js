const mongoose = require("mongoose")

const bookschema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    }, author: {
        type: String,
        required: true
    }, publisher: {
        type: String,
        required: true
    }, languages: {
        type: String,
        required: true
    }, noofpages: {
        type: Number,
        required: true
    }, isbn: {
        type: String,
        required: true
    }, imgUrl: {
        type: String,
        required: true
    }, category: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, Dprice: {
        type: Number,
        required: true
    }, abstract: {
        type: String,
        required: true
    }, uploadImages: {
        type: Array,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default:"Pending"
    }, broughtBy:{
        type: String,
        default:""
    }
})
const books = mongoose.model("books", bookschema)
module.exports = books
