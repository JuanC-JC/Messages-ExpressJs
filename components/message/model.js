const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    user:String,
    message:{
        type:String,
        required:true,          //debe cumplir con el requerimiento para crears
    },
    date:Date
})


//el modelo utilizado apra crear o modificar un dato
const model = mongoose.model('Message',mySchema)

module.exports = model;


