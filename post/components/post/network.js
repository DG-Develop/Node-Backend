const express = require('express')

const response = require('../../../network/response')
const auth = require('./secure')
const controller = require('./index')

const router = express.Router()

router.get('/', auth('list'), list)
router.get('/:id', auth('get'), get)
router.post('/', auth('add'), upsert)
router.put('/', auth('update', { owner: 'user' }), upsert)
router.put('/:id/like', auth('add'), like)


async function list(req, res, next){
    try {
        const data = await controller.list()
        response.success(req, res, data, 200)
    } catch (error) {
        next()
    }
    
}

async function get(req, res, next){
    try {
        const post = await controller.get(req.params.id)
        response.success(req, res, post, 200)
    } catch (error) {
        next()
    }
}

async function upsert(req, res, next){
    try {
        const post = await controller.upsert(req.body, req.user.id)
        response.success(req, res, post, 201)
    } catch (error) {
        next()
    }
}

async function like(req, res, next){
    try {
        const post = await controller.like(req.body, req.user.sub)
        response.success(req, res, post, 201)
    } catch (error) {
        next()
    }
}

module.exports = router