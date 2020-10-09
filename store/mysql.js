const mysql = require('mysql')
const user = require('../api/components/user')
const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

// Connect

let conection

function handleCon(params) {
    conection = mysql.createConnection(dbconf)
    conection.connect((err) => {
        if (err) {
            console.error('[db err]', err)
            setTimeout(handleCon, 2000)
        }else{
            console.log('DB Connected!')
        }
    })

    conection.on('error', err => {
        console.error('[db err]', err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon()
        } else {
            throw err
        }
    })
}

handleCon()

function list (table){
    console.log(table)
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table}`, 
            (err, data) => {
                if(err) return reject(err)
                resolve(data)
            }
        )
    })
}

module.exports = {
    list
}