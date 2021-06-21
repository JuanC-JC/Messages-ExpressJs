const express = require('express')
const message = require('../components/message/network')

const routes = (server)=>{
    //cuando se llame message se utiliza el router de message
    server.use('/message',message)
}

module.exports = routes;