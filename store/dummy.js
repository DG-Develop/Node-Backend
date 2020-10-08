const db = {
    'user': [
        { id: '1', name: 'David'}
    ]
}

async function list(tabla=[]) {
    return db[tabla]
}

async function get(tabla, id) {
    const colection = await list(tabla)
    return colection.find(item => item.id === id) || null
}

async function upsert(tabla, data) {
    if(!db[tabla]){
        db[tabla] = []
    }
    db[tabla].push(data)
    console.log(db)
}

async function remove(tabla, id) {
    return true
}

async function query(tabla, q){
    const colection = await list(tabla)
    const keys = Object.keys(q)
    const key = keys[0]

    return colection.find(item => item[key] === q[key]) || null
}

module.exports = {
    list,
    get, 
    upsert,
    remove,
    query
}