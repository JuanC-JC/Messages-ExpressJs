//el encargado de la logica y conectar con la base de datos

const store = require('./store')

function addMessage(user,message){

    return new Promise(async (resolve,reject)=>{

        if(!user || !message){
            reject('[messageController] No hay usuario o mensaje')
        }


        const fullMessage = {
            user:user,
            message:message,
            date: new Date() 
        }

        //store siempre devolvio una promesa wtf
        const result = await store.add(fullMessage)


        resolve(result)
            // .then(resolve('[messageController] mensaje creado correctamente '+ JSON.stringify(fullMessage)))
        

    })

}

function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
        return resolve(store.list(filterUser))
    })
}

function updateMessage(id,message){

    return new Promise(async(resolve,reject)=>{
        
        if(!id || !message){
            reject('Invalid data')
        }

        const result =  await store.update(id,message)

        console.log(result)
        resolve(result)
    })
}

        

module.exports = {
    addMessage,
    getMessages,
    updateMessage
}