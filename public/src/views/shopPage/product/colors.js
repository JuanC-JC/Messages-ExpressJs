import {seon} from '../../../../dataBase/data.js'

export default (id)=> {

    const productItem = seon.findProductById(id)
  
    //crea el componente colores
    let productColors = document.createElement('div')
    productColors.classList.add("l-product__colors")
 
    const cuerpo = `<div class="c-txt-16">Color:</div>
                    <div class="l-product__colors-items"></div>`
    productColors.innerHTML = cuerpo
    

    var colores = productItem.colorsTypes
    let colorSelected = null

    Object.entries(colores).forEach((element,index) => {
        let color = element[0]
        let unitColor = document.createElement("div");
        unitColor.className = 'c-color';
        unitColor.setAttribute('id',color)
        unitColor.style.background = element[1].hex;
        productColors.querySelector(".l-product__colors-items").appendChild(unitColor)
        

        if (index==0){
            unitColor.classList.add("c-color--selected")
            productColors.querySelector('.c-txt-16').textContent = `Color: ${color}`
            seon.producToSell.colorType = color
            colorSelected =unitColor
        }

        unitColor.addEventListener("click",()=>{
            colorSelected.classList.remove("c-color--selected")
            colorSelected = unitColor
            colorSelected.classList.add("c-color--selected")
            productColors.querySelector('.c-txt-16').textContent = `Color: ${color}`
            seon.producToSell.colorType = color
        })
    });    
    
    
    return productColors

}
