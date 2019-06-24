const express = require('express')
const model = require('../models/author')

const router = express.Router()

const getAuthors = async (req, res, next) => {
    try {
        const authors = await model.getAuthors()
        res.json(authors)
    } catch (err) {
        return next(err)
    }
}

router.get('/', getAuthors)

module.exports = router
