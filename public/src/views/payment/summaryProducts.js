import {seon} from '../../../dataBase/data.js'

const cSummaryProducts = () =>{

    const cSummaryProducts = document.createElement('div')
    cSummaryProducts.classList.add('l-summary-products')

    //first select is Envio - cost is 7000
    seon.costShipping = 7000
    const productsValue = seon.totalValueCart()
    const totalValue = seon.totalToPay()

    cSummaryProducts.innerHTML = `<section class="menu-desplegable" >

                                    <div class="menu-desplegable__header">

                                        <div class="menu-header">

                                            <div class="menu-header__container">

                                                <div class="carrito"><i class="fas fa-shopping-basket"></i></div>
                                                <div class="text">
                                                    <div id="summaryState" class="text__text">Mostrar resumen del pedido</div>
                                                    <div id="buttonSummary" class="text__arrow"><i class="fas fa-chevron-down"></i></div>
                                                </div> 

                                            </div>
                                            <p class="menu-header__total">$ ${totalValue}</p>

                                        </div>
                                        
                                    </div>
                                </section>

                                <section  class="menu-productos">

                                    <div id="visorProducts" class="main__productos c-scroll">

                                    </div>

                                    <div class="menu-productos__container">

                                        <div class="container__bottons">
                                            <input class="botton-descuento" type="text" placeholder="Cupón o código de descuento">
                                            <div class="c-button c-button--green">Usar</div>
                                        </div>

                                        <div class="container__description">

                                            <div class="envio">
                                                <div class="text">Envios</div>
                                                <div id="costShipping" class="value">$ ${seon.costShipping}</div>
                                            </div>

                                            <div class="envio">
                                                <div class="text">Descuento</div>
                                                <div id="discount" class="value">$ ${seon.discount}</div>
                                            </div>      

                                            <div class="subtotal ">
                                                <div class="text">Sub Total</div>
                                                <div id="subTotal" class="value">$ ${productsValue}</div>
                                            </div>

                                            <div class="total">
                                                <div class="text"> Total   </div>
                                                <div class="value">
                                                    cop $ <span id='totalPayment'> ${totalValue}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>`

    const lProducts = cSummaryProducts.querySelector('#visorProducts')

    const buttonSummaryState = cSummaryProducts.querySelector('#buttonSummary')
    const lSummaryProducts = cSummaryProducts.querySelector('.menu-productos')
    const textSummaryState = cSummaryProducts.querySelector('#summaryState')
    const headerSummary = cSummaryProducts.querySelector('.menu-header')

    headerSummary.style.cursor = 'pointer'
    headerSummary.addEventListener('click',showSummary)

    //render products in summary
    seon.cart.forEach(product =>{
        lProducts.appendChild(cProductPayment(product))
    })        
    
    //show modal of summary
    function showSummary(element){

        buttonSummaryState.classList.toggle("icon--translate");

        buttonSummaryState.classList.contains('icon--translate')
        ? textSummaryState.textContent = "Ocultar resumen del pedido"
        : textSummaryState.textContent = "Mostrar resumen del pedido"

        lSummaryProducts.classList.toggle("menu-productos--visibility")

    }

    return cSummaryProducts
}

export {cSummaryProducts}



const cProductPayment = (product) =>{

    const cProductPayment = document.createElement('div')
    cProductPayment.classList.add('producto')

    const productItem = seon.findProductById(product.id)

    cProductPayment.innerHTML = `<div class="producto__img">
                                <img src="${productItem.urlImg}" alt=""></div>

                                <div class="producto__description">
                                    <div class="name">${productItem.name}</div>
                                    <div class="description">set ${product.unitType} - ${product.colorType} <br> ${product.units} und.</div>
                                </div>

                                <div class="producto__total">$ ${product.total}</div>`

    return cProductPayment
}