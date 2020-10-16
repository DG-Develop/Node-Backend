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
        } else {
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

function list(table) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table}`,
            (err, data) => {
                if (err) return reject(err)
                resolve(data)
            }
        )
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE id=${id}`,
            (err, data) => {
                if (err) return reject(err)
                resolve(data)
            }
        )
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ?`, data,
            (err, result) => {
                if (err) return reject(err)
                resolve(result)
            }
        )
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        conection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id],
            (err, result) => {
                if (err) return reject(err)
                resolve(result)
            }
        )
    })
}

function upsert(table, data) {
    if (data && data.id) {
        return update(table, data)
    } else {
        return insert(table, data)
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE ?`, query,
            (err, res) => {
                if (err) return reject(err)
                const data = {
                    id: res[0].id,
                    username: res[0].username,
                    password: res[0].password,
                }
                resolve(data || null)
            })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}