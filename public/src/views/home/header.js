import {renderCart} from '../shopPage/cart/controllerCart.js'

export default (app) => {

    const view = `<div class="header__logo"></div>
                    <div class="c-icon c-icon--big"><i id="menuIcon" class="fas fa-bars" ></i></div>        
                    <nav id="menuHeader" class="header__menu">
                        <ul class="menu-container">
                            <li id="home"><a href="">Home</a></li>
                            <li id="intro" ><a href="">Intro</a></li>
                            <li id="proceso"><a href="">Proceso</a></li>
                            <li id="productos"><a href="">Productos</a></li>
                            <li id="cart"><a href=""><i class="fas fa-shopping-cart"></i></a></li>
                        </ul>
                    </nav>`

    const header = document.createElement('header')
    header.setAttribute('id','header')
    header.classList.add('header','header--home')
    header.innerHTML = view;

    const icon = header.querySelector('#menuIcon')
    const menu = header.querySelector('#menuHeader')


    icon.addEventListener('click',desplegable)

    let linksMenu = header.querySelectorAll("li")

    linksMenu.forEach(link => {

        link.addEventListener("click",(event) =>{
            event.preventDefault();

            //time to finish the contraction if menu is visibilty
            if(menu.classList.contains('menu--visibility')){
                contraer()
                setTimeout(()=>{
                    link.id !== 'cart' ? moveScroll(link.id) : renderCart()
                },300)
            }else{
                link.id !== 'cart' ? moveScroll(link.id) : renderCart()
            }

        })
    });


    window.onscroll = modifyHeader
    window.onresize = modifyHeader




    return header
}

function contraer(){

    let menu = document.querySelector('#menuHeader')

    if(menu.classList.contains('menu--visibility')){
        menu.classList.remove("menu--visibility")

        let menuIcon = document.querySelector('#menuIcon')
         menuIcon.classList.add("fa-bars")
         menuIcon.classList.remove("fa-times")
    }

}

//change the header when resize window, the header is draw or can be transparent -> by defect is transparent
function modifyHeader(){

    const width = document.documentElement.clientWidth
    const header = document.getElementById("header");

    if (width < 768){

        header.classList.remove("header--draw");

    }else if (width >= 768){

        contraer()

        const y = window.scrollY;

        if (y < 400){
            header.classList.remove("header--draw");
        } else {
            header.classList.add("header--draw")
        }

    }

}

function desplegable(){

    //para acceder menu
    let menu = document.querySelector('#menuHeader')
        menu.classList.toggle("menu--visibility")

    //cambiar su imagen
    let menuIcon = document.querySelector('#menuIcon')
       menuIcon.classList.toggle("fa-bars")
       menuIcon.classList.toggle("fa-times")

}

function moveScroll(name){
    let seccion = document.getElementsByClassName(name)[0] 
    let posicionSeccion = seccion.offsetTop;
    window.scrollTo (0,posicionSeccion-60)
}
