import {seon} from '../../../../dataBase/data.js'
import {componentProduct as cProductCart} from './product.js'
import {cModalInfo} from '../../info.js'

//component cart

const componentCart = ()=> {

    const shoppingCart = document.createElement("div")
    shoppingCart.setAttribute('id','shooping-cart')
    shoppingCart.classList.add("l-shooping-cart")

    const view = `      <div class="c-shooping__header">
                            <h3 class="c-shooping__title">Carrito de compra</h3>
                            <div id="shooping-cart__close" class="c-shooping__close c-button c-button--flat c-button--small"><i class="fas fa-times"></i></div>
                        </div>

                        <div class="l-shooping__products c-scroll">
                     
                        </div>
                        <div class="l-shooping__sell">

                            <div class="c-container c-shooping__discount">
                                <div class="c-two-thirds">
                                    <p>descuento</p> 
                                </div>
                                <div class="c-one-third c-txt-right">
                                    <p>$ ${0}</p> 
                                </div>
                            </div>

                            <div class="c-container c-shooping__value">
                                <div class="c-two-thirds">
                                    <p>Total</p> 
                                </div>
                                <div class="c-one-third c-txt-right">
                                    <p id='totalValueCart'> </p> 
                                </div>
                            </div>

                            <div class="c-shooping__text-condition c-txt-l-14">
                                Los códigos de descuento, los costes de envío y los impuestos se añaden durante el pago.
                            </div>

                            <div class="c-shooping__acept-condition c-checkbox-option">
                                <input type="checkbox" id="buttonConditions">
                                <label for="buttonConditions"> Acepto los terminos y condiciones</label>
                            </div>

                            <div id='finalizeOrder' class="c-button c-button--green">Finalizar pedido</div>


                        </div>`

    shoppingCart.innerHTML = view

    //cierre del modal
    let cartClose = shoppingCart.querySelector('#shooping-cart__close');
    let finalizeOrder = shoppingCart.querySelector('#finalizeOrder')
    let statusConditions = shoppingCart.querySelector('#buttonConditions')

    //close cart and change the page to payment when order finished
    finalizeOrder.addEventListener('click',()=>{

        document.body.removeEventListener('keydown',modalController) //remove event for cart

        if(seon.cart.length == 0 ){
            document.body.appendChild(cModalInfo('Debe ingresar algun producto en el carrito para continuar','warning',()=>{
                document.body.addEventListener('keydown',modalController) //when close modal add event agains to cart
            }))
            return
        }

        if(!statusConditions.checked){
            document.body.appendChild(cModalInfo('Acepte los terminos y condiciones antes de continuar','error',()=>{
                document.body.addEventListener('keydown',modalController)
            }))

        }else{
            closeCart()
            window.location.hash = '#/payment'
        }

    })

    //close cart by manual close
    cartClose.addEventListener('click',()=>{
        closeCart()
    })


    //el evento escuchador debe estar cuando esta show

    //cuando se esconde debe removerse

    //cuando el modal de warning esta abierto debe removerse

    //el modal esta abierto osea que el body ya esta escuchando algo

    return shoppingCart
}

//render (show and hidden component cart (modal))
function renderCart(callback){  

    const cart = document.getElementById('shooping-cart')

    //modify state of modal
    cart.classList.toggle('l-show-modal')
    document.body.classList.toggle('showing-modal')

    //only if the cart change to visible, render all the products
    if(cart.classList.contains('l-show-modal')){
        drawProductsCart()
        document.querySelector('#totalValueCart').textContent = `$ ${seon.totalValueCart()}`

        document.body.addEventListener('keydown',modalController)
    }

    //use when close the render cart and we need to change the page
    if(typeof callback == "function"){
        callback()
    }

}

//remove and update products cart from seon.cart
function drawProductsCart(){
    const cart = document.querySelector('.l-shooping__products')

    Array.from(cart.children).forEach(element=>{
        cart.removeChild(element)
    })

    seon.cart.forEach(product=>{
        cart.appendChild(cProductCart(product))
    })

}


function modalController(e){

    e.preventDefault()
    if(e.key == 'Escape'){
        closeCart()
    }
}

//close the modal cart
function closeCart(){

    const statusConditions = document.querySelector('#buttonConditions')
    const cart = document.querySelector('#shooping-cart')

    //hide the cart
    cart.classList.remove('l-show-modal')
    document.body.classList.remove('showing-modal')
    statusConditions.checked = false

    //remove the event
    document.body.removeEventListener('keydown',modalController)

}

export {componentCart,renderCart,modalController}