import {seon} from '../../dataBase/data.js'   

//Componentes para crear la pagina de compra
import {componentHeader as cHeader} from './shopPage/header.js'     
import {componentProduct as cProduct} from './shopPage/product/controllerProduct.js'
import {componentCart as cCart} from './shopPage/cart/controllerCart.js'


export default (id) =>{
    // -> header especifico pagina de compra
    const header = cHeader()
    window.document.body.prepend(header)

    //creo el elemento shopPage
    const shopPage = document.createElement('div')
    shopPage.setAttribute('id','shoop')
    shopPage.classList.add('l-shop')

    const productItem = seon.findProductById(id)

    const view = `  <div class="c-separation-line"></div>

                    <p class="c-condition">${productItem.info}</p>

                    <div class="c-get-back c-button c-button--green">Volver</div>`

    shopPage.innerHTML = view

    //agrega los componentes 
    shopPage.prepend(cProduct(id))   // -> vista del producto
    shopPage.appendChild(cCart())    // -> vista del carrito

    // -> boton de retorno home
    let backButton = shopPage.querySelector(".c-get-back")                  
    backButton.addEventListener('click',()=> window.location.hash = '')   

    return shopPage
}


