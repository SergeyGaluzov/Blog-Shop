'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    if(req.session)
        req.session.destroy(err => {
            res.redirect('/')
        })
})

module.exports = router