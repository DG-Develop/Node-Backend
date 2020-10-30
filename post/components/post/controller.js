const { nanoid } = require('nanoid')
const error = require('../../../utils/error')

const COLLECTION = 'post'

module.exports = function (injectedStore) {

    let store = injectedStore

    if (!store) {
        store = require('../../../store/dummy')
    }

    function list() {
        return store.list(COLLECTION)
    }

    async function get(id){
        const user = await store.get(COLLECTION, id)

        if(!user){
            throw error('No existe el post', 404)
        }
        const newPost = {
            id: user.id,
            text: user.text,
            user: user.user
        }

        console.log(user.text)
        return newPost
    }

    async function upsert(data, user){
        const post = {
            id: data.id,
            user: user,
            text: data.text
        }

        if(!post.id){
            post.id = nanoid()
        }

        return store.upsert(COLLECTION, post).then(() =>  post)
    }

    async function like (post, user){
        const like = await store.upsert(COLLECTION+'_like',{
            post: post,
            user: user,
        })

        return like
    }

    return {
        list,
        get,
        upsert,
        like
    }

}

