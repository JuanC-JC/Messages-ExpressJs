import {seon} from '../../dataBase/data.js'
import {cSummaryProducts} from './payment/summaryProducts.js'
import {cFormPayment} from './payment/formPayment.js'
import {cModalInfo} from './info.js'

export default ()=>{

    const cPayment = document.createElement('div')

    if(seon.cart == 0){
        document.body.appendChild(cModalInfo('Debe ingresar algun producto en el carrito para generar el pago!','warning',()=>{
            window.location.hash = '';
        }))
    }else{
        cPayment.classList.add('section__page')

        cPayment.appendChild(cSummaryProducts())
        cPayment.appendChild(cFormPayment())
    }

    return cPayment
}



