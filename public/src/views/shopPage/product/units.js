import {seon} from '../../../../dataBase/data.js'
import {modifyTotal} from '../product/controllerProduct.js'

export default (id)=> {

    const productItem = seon.findProductById(id)

     //crea el componente unidades de producto
     let productUnits = document.createElement("div")
     productUnits.classList.add("l-product__units")

    let units = productItem.unitsTypes
    let buttonSelected = null

    //create htmlEelements for every typeUnits
    units.forEach((unit,index) => {

        let cUnit = document.createElement('div')
        cUnit.className = 'c-button c-button--small c-button--flat'
        cUnit.setAttribute('data-type','unit')
        cUnit.setAttribute('data-unitType',unit)
     
        if(index == 0){
            cUnit.classList.add("c-button--selected")
            seon.producToSell.unitType = unit.toString()
            buttonSelected = cUnit
           

        }

        unit>1
        ? cUnit.textContent = `${unit} Piezas.`
        : cUnit.textContent = `${unit} Pieza`


        cUnit.addEventListener('click', ()=>{
            buttonSelected.classList.remove('c-button--selected')
            buttonSelected = cUnit
            buttonSelected.classList.add('c-button--selected')
            
            seon.producToSell.unitType = buttonSelected.dataset.unittype

            modifyTotal()
        })

        productUnits.appendChild(cUnit)

    });


    return productUnits 
 
}










