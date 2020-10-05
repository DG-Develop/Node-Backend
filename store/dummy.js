const db = {
    'user': [
        { id: '1', name: 'David'}
    ]
}

async function list(tabla) {
    return db[tabla]
}

async function get(tabla, id) {
    const colection = await list(tabla)
    return colection.find(item => item.id === id) || null
}

async function upsert(tabla, data) {
    db[colection].push(data)
}

async function remove(tabla, id) {
    return true
}

module.exports = {
    list,
    get, 
    upsert,
    remove
}