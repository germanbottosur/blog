const express = require('express')
const app = express()

const indexController = require('./controllers/index')
const articleController = require('./controllers/article')

app.use('/', indexController)
app.use('/articles/', articleController)

module.exports = app
