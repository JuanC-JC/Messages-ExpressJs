import {renderCart} from './cart/controllerCart.js'

const componentHeader = () => {

    const view =    `<div class="header__logo"></div>   
                    <nav id="menuHeader" class="header__menu">
                        <ul class="menu-container">
                            <li class='c-icon c-icon--big' id="headerHomeButton">
                                <i id="menuIcon" class="fas fa-home"></i>
                                <span>Home</span>
                            </li>
                            <li class='c-icon c-icon--big' id="headerCartButton">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Cart</span>
                            </li>
                        </ul>
                    </nav>`

    const header = document.createElement('header')
    header.setAttribute('id','header')
    header.classList.add('header','header--shop')
    header.innerHTML = view;


    //funcionalidad botones del header
    const headerLogo = header.querySelector('.header__logo')
    const headerHomeButton = header.querySelector('#headerHomeButton')
    const headerCartButton =  header.querySelector('#headerCartButton')


    headerLogo.style.cursor = 'pointer'

    //abrir modal del carrito y volver a home
    headerCartButton.addEventListener('click',renderCart)
    headerHomeButton.addEventListener('click', ()=> window.location.hash = '' )
    headerLogo.addEventListener('click', ()=> window.location.hash = '' )


    return header
}

export {componentHeader}