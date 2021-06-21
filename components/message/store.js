const db = require('mongoose')
const Model = require('./model')

db.Promise = global.Promise

//mongodb+srv://user:juankamil0@messageplatzi.qqtrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
db.connect('mongodb+srv://user:juankamil0@messageplatzi.qqtrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

console.log('[db] conectada con exito')

function addMessage(message){
    const myMessage = new Model(message)
    return myMessage.save() //esto devuelve una promesa
}

async function getMessages(filterUser){
    let filter = {};

    //este filtro no distingue entre mayusculas y minisculas
    if(filterUser !== null){
        filter = {user:filterUser}
    }

    const messages = await Model.find(filter);

    return messages
}


async function updateMessage(id,message){
    const originMessage = await Model.findOne({
        _id:id
    })

    originMessage.message = message //solo se cambie el message no el user ni la fecha...

    const newMessage = await originMessage.save()

    return newMessage
}

module.exports = {
    add:addMessage,
    list:getMessages,
    update:updateMessage
}