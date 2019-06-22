const express = require('express')
const router = express.Router()

// TODO

router.get('/', (req, res) => res.json([]))

router.post('/', (req, res) => res.sendStatus(503))

router.get('/:id', (req, res) => res.sendStatus(404))

router.patch('/:id', (req, res) => res.sendStatus(404))

router.delete('/:id', (req, res) => res.sendStatus(404))

module.exports = router
