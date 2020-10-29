const { nanoid } = require('nanoid')
const auth = require('../auth')

const TABLA = 'user'


module.exports = function(injectedStore){

    let store = injectedStore

    if(!store){
        store = require('../../../store/dummy')
    }

    function list(){
        return store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA, id)
    }

    async function upsert(body){
        let keyGenerate = ''
        const user = {
            name: body.name,
            username: body.username
        }

        if(body.id){
            user.id = body.id
        }else {
            user.id = nanoid()
            keyGenerate = 'active'
        }

        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            }, keyGenerate)
        }

        return store.upsert(TABLA, user, keyGenerate)
    }

    function remove(id){
        return store.remove(TABLA, id)
    }

    function follow(from, to){
        return store.upsert(TABLA + '_follow',{
            user_from: from,
            user_to: to
        })
    }

    async function following(user){
        const join = {}
        join[TABLA] = 'user_to' // { user: 'user_to' }
        const query = { user_from: user }

        return await store.query(TABLA + '_follow', query, join)
    }

    return{
        list,
        get,
        upsert,
        remove,
        follow,
        following
    }
}
