//recibir la peticion procesar la infromacion y enviarla al controlador
const express = require('express')
const response = require('../../network/response')
const router = express.Router();
const controller = require('./controller')

//si este router aplica desde una ruta anterior es concatenada ejemplo message/edit = /edit
router.get('/',async(req,res)=>{

    // console.log(req.query) = va  en la url por ejemplo orderBy=nombre

    const filterUser = req.query.user || null


    try{

        const messageList = await controller.getMessages(filterUser)
        
        response.success(req,res,messageList,200)

    }catch(error){

        response.error(req,res,'Unexpected Error',500, error)

    }

})


router.post('/',async (req,res)=>{

    try {
        const data = await controller.addMessage(req.body.user,req.body.message)

        response.success(req,res,data,201)

    }catch(error){

        response.error(req,res,'Unexpected Error',400, error)

        console.error(error)
    }

})

router.patch('/:id',async (req,res)=>{

    try {
        const data = await controller.updateMessage(req.params.id,req.body.message)

        response.success(req,res,data,200)

    } catch (error) {
        response.error(req,res,'Unexpected Error', 401, error)
    }
    
})

module.exports = router;