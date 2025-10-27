const books = require("../model/bookModel");
const stripe = require('stripe')(process.env.STRIPESECRETKEY);


exports.addBookController = async (req, res) => {
    console.log(`inside add book controller`);
    // res.status(200).json("req received")
    // console.log(req.files);
    const { title, author, publisher, languages, noofpages, isbn, imgUrl, category, price, Dprice, abstract } = req.body



    try {
        const existingBook = await books.findOne({
            title,
            userMail: req.payload
        })
        if (existingBook) {
            res.status(401).json("Book Already Exist")
        } else {
            const newBook = new books({
                title,
                author,
                publisher,
                languages,
                noofpages,
                isbn,
                imgUrl,
                category,
                price,
                Dprice,
                abstract,
                uploadImages: req.files,
                userMail: req.payload
            })

            await newBook.save()
            res.status(200).json(newBook)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// get home book

exports.homeBookController = async (req, res) => {
    try {
        const allHomeBooks = await books.find().sort({ _id: -1 }).limit(4)
        res.status(200).json(allHomeBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all book controller

exports.getAllBookController = async (req, res) => {
    const { search } = req.query
    console.log(search);
    const userMail = req.payload

    try {
        const query = {
            title: {
                $regex: search, $options: "i"
            },
            userMail: {
                $ne: userMail
            }

        }
        const allUsersBooks = await books.find(query)
        res.status(200).json(allUsersBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get particular book

exports.getABookCOntroller = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const specificBook = await books.findOne({ _id: id })
        res.status(200).json(specificBook)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all user added book

exports.getAllUserAddedBookController = async (req, res) => {

    const userMail = req.payload

    try {
        const allUserBooks = await books.find({ userMail })
        res.status(200).json(allUserBooks)
    } catch (error) {
        res.status(500).json(error)
    }

}


//  get a userbrought book
exports.getAllUserBroughtBookController = async (req, res) => {

    const userMail = req.payload

    try {
        const allUserBroughtBook = await books.find({ broughtBy: userMail })
        res.status(200).json(allUserBroughtBook)
    } catch (error) {
        res.status(500).json(error)
    }

}

// to delete a particular book
exports.deleteABookController = async (req, res) => {
    const { id } = req.params
    try {
        await books.findByIdAndDelete({ _id: id })
        res.status(200).json("Book Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}
// ------------------------admin--------------------------------

// get all books

exports.getAllBooksAdminController = async (req, res) => {
    try {
        const allBooks = await books.find()
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// approve books
exports.approveBookController = async (req, res) => {
    const { id } = req.params
    try {
        const updateBooks = await books.findByIdAndUpdate({ _id: id }, { status: "Approved" }, { new: true })
        res.status(200).json(updateBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// payment

exports.paymentController = async (req, res) => {
    const email = req.payload
    console.log(email);

    const { bookDetails } = req.body
    console.log(bookDetails);

    try {
        const existingBook = await books.findByIdAndUpdate({ _id: bookDetails._id }, {
            title: bookDetails.title,
            author: bookDetails.author,
            publisher: bookDetails.publisher,
            languages: bookDetails.languages,
            noofpages: bookDetails.noofpages,
            isbn: bookDetails.isbn,
            imgUrl: bookDetails.imgUrl,
            category: bookDetails.category,
            price: bookDetails.price,
            Dprice: bookDetails.Dprice,
            abstract: bookDetails.abstract,
            uploadImages: bookDetails.uploadImages,
            userMail: bookDetails.userMail,
            status: "Sold",
            broughtBy: email
        }, { new: true })
        console.log(existingBook);


        const line_item = [{
            price_data: {
                currency: "usd", //dollars
                product_data: {
                    name: bookDetails.title,
                    description: `${bookDetails.author} | ${bookDetails.publisher}`,
                    images: [bookDetails.imgUrl],
                    metadata: {
                        title: bookDetails.title,
                        author: bookDetails.author,
                        publisher: bookDetails.publisher,
                        languages: bookDetails.languages,
                        noofpages: bookDetails.noofpages,
                        isbn: bookDetails.isbn,
                        imgUrl: bookDetails.imgUrl,
                        category: bookDetails.category,
                        price: `${bookDetails.price}`,
                        Dprice:`${bookDetails.Dprice}`,
                        abstract: bookDetails.abstract.slice(0,20),
                        // uploadImages: bookDetails.uploadImages,
                        userMail: bookDetails.userMail,
                        status: "Sold",
                        broughtBy: email
                    },

                },
                unit_amount : Math.round(bookDetails.Dprice * 100), // cent purchase amount
            },
            quantity : 1
        }]
        //create a checkout session for stripes
        const session = await stripe.checkout.sessions.create({
            // payment type
            payment_method_types: ["card"],
            // details of the product that we are purchasing
            line_items: line_item,
            //mode of payment
            mode: 'payment',
            // payment successful
            success_url: `http://localhost:5173/payment-success`,
            // payment cancelled or failde
            cancel_url: `http://localhost:5173/payment-error`,
        })
        console.log(session);
        // res.status(200).json({sessionId : session.id})
         res.status(200).json({sessionURL : session.url})

    } catch (error) {
        res.status(500).json(error)
    }
}