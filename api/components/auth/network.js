const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.post('/login', async function(req, res){
    try {
        const token = await controller.login(req.body.username, req.body.password)
        response.success(req, res, token, 200)
    } catch (error) {
        response.error(req, res, 'Informacion invalida', 400)
    }
    
})

module.exports = router