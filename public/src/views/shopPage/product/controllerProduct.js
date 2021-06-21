import {seon} from '../../../../dataBase/data.js'       //database

import {renderCart} from '../cart/controllerCart.js'  //interaccion con el carrito

import productDescription from './descriptions.js' //componentes para crear la vista de producto
import productUnits from "./units.js"
import productColors from "./colors.js"

import {cModalInfo} from '../../info.js'

const componentProduct = (id) =>{

    // -> component cProduct
    const cProducto = document.createElement("div")
    cProducto.classList.add('c-product')
    
    //fetch data of product to sell
    const productItem = seon.findProductById(id)

    //assing first values for product to sell --> instance of window
    seon.producToSell.id = id
    seon.producToSell.name = productItem.name
    seon.producToSell.units = 1
    seon.producToSell.price = productItem.values[0].price //primer precio del primer unitType
    seon.producToSell.unitType = productItem.unitsTypes[0].toString()
    seon.producToSell.colorType = Object.keys(productItem.colorsTypes)[0]
    seon.producToSell.total = seon.producToSell.units * seon.producToSell.price

    const view = `
            <div class="l-product__header">
                
                <h2 class="c-product__title">${productItem.name}</h2>
                <div class="c-product__id">codigo: 000${productItem.id}</div>

                <div class="c-product__feedback">
                    <div class="c-feedback__txt">feedback<span class="c-txt-l-14">(${productItem.feedback})</span> </div>
                    <div class="c-feedback__qualification-img"></div>
                </div>
            </div>

            <div class="l-product__representation">
                <div class="c-product__img">
                    <div>
                        <img src="${productItem.urlImg}" alt="producto xxx${productItem.name}" width="520" height="520">
                        <div class="c-product__price">
                            <h3>$${productItem.values[0].price}</h3>
                            <p>$${productItem.beforeValue}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-product__information">

                <div class="l-product__quantity-total">

                    <div class="l-product__quantity-increment">
                        <div class="c-txt-16">Unidades</div>
                        <div class="c-increment">
                            <div id = "plus" class="c-increment__button c-button c-button--flat"><i class="fas fa-plus"></i></div>
                            <div class="c-increment__text">1</div>
                            <div id = "minus" class="c-increment__button c-button c-button--flat"><i class="fas fa-minus"></i></div>
                        </div>
                    </div>
                    

                    <div class="l-product__value-total">
                        <div class="c-txt-16">Total</div>
                        <div id="totalValue" class="c-button c-button--flat">$ ${productItem.values[0].price}</div>
                    </div>
                </div>

                <div id="product__button" class="c-button c-button--green">Agregar al carrito</div>

        </div>`

    cProducto.innerHTML = view

    //agrega el componente descriptionProduct
    let contentInfo = cProducto.querySelector(".l-product__information")
    contentInfo.prepend(productDescription(id))      

    //agrega el componente unidades
    let productDescripcion = cProducto.querySelector('.l-product__descriptions') 
    productDescripcion.insertAdjacentElement('afterend',productUnits(id))  

    //agrega el componente colores
    let productUnit = cProducto.querySelector('.l-product__units') 
    productUnit.insertAdjacentElement('afterend',productColors(id))  

    
    //boton de añadir producto al carrito
    let shoopButton = cProducto.querySelector('#product__button')
    shoopButton.addEventListener("click",()=>{addProductToCart() ? renderCart() : ''})
      
    //asigna funcionalidad a los botones de sumar o disminuir cantidad
    let moreQuantity = cProducto.querySelector('#plus')
    let lessQuantity = cProducto.querySelector('#minus')
    let quantityText = cProducto.querySelector('.c-increment__text')

    moreQuantity.addEventListener("click", ()=>{
        seon.producToSell.units += 1
        quantityText.textContent = seon.producToSell.units
        modifyTotal()
    })

    lessQuantity.addEventListener("click", ()=>{

        if(seon.producToSell.units > 1){
            seon.producToSell.units -= 1
            quantityText.textContent = seon.producToSell.units
            modifyTotal()
        }
    })
  
    return cProducto
}

// calculate the new total with plusQuantity, lessQuantity 
// used by unitType
function modifyTotal(){

    let productItem = seon.findProductById(seon.producToSell.id)
    let unitSelected = seon.producToSell.unitType
    let priceSelected = productItem.values.find(unit => unit.unitType == unitSelected).price
    
    seon.producToSell.price = priceSelected
    seon.producToSell.total = seon.producToSell.units * seon.producToSell.price

    let totalValueText = document.querySelector('#totalValue')
    totalValueText.textContent = `$ ${seon.producToSell.total}`

}

//create a new product base in seon.productToSell (product in window)
function addProductToCart(){

    let productItem = seon.findProductById(seon.producToSell.id)
    let quantitySell = seon.producToSell.units
    let colorStock = seon.producToSell.colorType
    let stock = productItem.stocks[colorStock].quantity

    let productMatchInCart = seon.cart.find(element=> element.unitType == seon.producToSell.unitType && element.colorType == colorStock && element.id == seon.producToSell.id)

    //si el producto existe en el carrito
    if(productMatchInCart){

        let quantityFinal = productMatchInCart.units + quantitySell

        if (quantityFinal>stock){
            document.body.appendChild(cModalInfo('El producto no contiene el suficiente inventario, intenta con otro color','warning'))
            return false
            
        }else{
            productMatchInCart.units += quantitySell
            productMatchInCart.total = productMatchInCart.units * productMatchInCart.price
            window.localStorage.setItem('cart',JSON.stringify(seon.cart))
            return true
        }
    }
    else{ 
        if(quantitySell > stock){
            // console.log('melo')
            document.body.appendChild(cModalInfo('El producto no contiene el suficiente inventario, intenta con otro color','error'))
            
            // alert("")
            return false
        }
        else{
            let newProduct = {...seon.producToSell}
            seon.addProductToCart(newProduct)

            //actualizar el carrito en el localstorage
            window.localStorage.setItem('cart',JSON.stringify(seon.cart))
            console.log(window.localStorage.getItem('cart'))
            return true
        }
    }

}

export {componentProduct,modifyTotal}