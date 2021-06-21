import {seon} from '../../../../dataBase/data.js'

export default (id) => {

    const productItem = seon.findProductById(id)
    
    //crea el componente descipción del producto
    const descriptionProduct = document.createElement('div');
    descriptionProduct.classList.add('l-product__descriptions');
   

    //obtengo las descripciones de el producto y su tamaño
    const descriptions = productItem.descriptions
    const descriptionsLenght = descriptions.length

    for (let i = 0; i < descriptionsLenght; i ++ ){
        if (i<descriptionsLenght-1){
        descriptionProduct.innerHTML +=  `<div class="c-description-item c-description-item--right">${descriptions[i]}</div>`
        } else{
            descriptionProduct.innerHTML += `<div class="c-description-item">${descriptions[i]}</div>`
        }
    }

      return descriptionProduct
}