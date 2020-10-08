const jwt = require('jsonwebtoken')
const { secret } = require('../config').jwt
const error = require('../utils/error')

function sign(data){
    return jwt.sign(data, secret)
}


function verify(token){
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner){
        const decoded = decodeHeader(req)
        console.log(decoded)

        // COMPROBAR SI ES O NO PROPIO
        if(decoded.id !== owner){
            throw error('No puedes hacer esto', 401)
        }
    }
}

function getToken(auth){
    // Bearer askjflasjdfslk
    if(!auth){
        throw new Error('No viene token')
    }

    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido')
    }

    const token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req){
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded

    return decoded
}


module.exports = {
    sign,
    check
}