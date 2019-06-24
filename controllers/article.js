const express = require('express')
const model = require('../models/article')

const router = express.Router()

const getArticles = async (req, res, next) => {
    // TODO add filters
    // TODO add pagination
    try {
        articles = await model.getArticles()
        res.json(articles)
    } catch (err) {
        return next(err)
    }
}

const addArticle = async (req, res, next) => {
    try {
        // TODO sanitize
        const data = req.body
        const articleId = await model.addArticle(data)
        
        res.links({
            article: `${articleId}/`
        })
        res.sendStatus(201)
    } catch (err) {
        return next(err)
    }
}

router.get('/', getArticles)

router.post('/', addArticle)

// TODO

router.get('/:id', (req, res) => res.sendStatus(503))

router.patch('/:id', (req, res) => res.sendStatus(503))

router.delete('/:id', (req, res) => res.sendStatus(503))

module.exports = router
