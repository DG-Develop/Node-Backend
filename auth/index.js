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
        // COMPROBAR SI ES O NO PROPIO
        if(decoded.id !== owner){
            throw error('No puedes hacer esto', 401)
        }
    },
    logged: function(req){
        const decoded = decodeHeader(req)
    }
}

function getToken(auth){
    // Bearer askjflasjdfslk
    if(!auth){
        throw error('No viene token', 401)
    }

    if(auth.indexOf('Bearer ') === -1){
        throw error('Formato invalido', 401)
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