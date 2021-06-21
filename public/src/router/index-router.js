import {routes} from './routes.js'
import notFound from '../views/notFound.js'


const matchUrl = (hashToFind) => {

    '#/product/1'

    ['#','product',"1"]

    //tengo la lista separada por seria #, product, 1
    const urlArray = hashToFind.split('/').slice(1)

    //no esta buscando home
    if (urlArray.length > 0){

        return {route:routes.find(route => route.path == urlArray[0]), search:urlArray[1]}
    } 

    ''
    return {route:routes.find(route => route.path == hashToFind), search:null}

    

}

const removeBody = () =>{

    window.onscroll = ''
    window.onresize = ''

    // element child solo detecta elementos de tipo elemenHTML
    while (window.document.body.lastElementChild){
        window.document.body.lastElementChild.remove()
    }
            
}
 

const createAppRoute = () =>{

    removeBody()

    const app = document.createElement('div')

    app.setAttribute('id','app')

    document.body.appendChild(app)

    return app
}

const router = (route) =>{ 

    const app = createAppRoute()

    let match = matchUrl(route)

    //si hizo match en algo....
    if(match.route !== undefined ){
        
        //remove however class in body
        document.body.className = ''


        if(match.route.path == 'product'){

            app.appendChild(match.route.template(match.search)) 
        }
        else{

            app.appendChild(match.route.template())
        }
    
    }
    
    //si no encontro la ruta, cambiar el hash por uno que si exista
    else{
        app.appendChild(notFound())
    }

}

export {router}



