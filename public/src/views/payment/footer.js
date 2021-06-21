
const cFooterPayment = ()=>{
    const cFooter = document.createElement('div')
    cFooter.classList.add('footer-seccion-page')
    cFooter.innerHTML = '<p class="footer-seccion-page__text">Todos los derechos reservados</p>'

    return cFooter
}

export {cFooterPayment}