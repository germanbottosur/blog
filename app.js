const express = require('express')
const bodyParser = require('body-parser')
const indexController = require('./controllers/index')
const authorController = require('./controllers/author')
const articleController = require('./controllers/article')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// TODO authentication?

app.use('/', indexController)
app.use('/authors/', authorController)
app.use('/articles/', articleController)

app.use(function (err, req, res, next) {
    // TODO improve logs
    console.error(err)

    res.status(500)
    res.type('text/plain')
    res.send('Ups, something is not working')
})

module.exports = app
