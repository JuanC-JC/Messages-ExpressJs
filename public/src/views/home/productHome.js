
export default (product)=>{

    const divProduct = document.createElement('div')
    divProduct.classList.add('producto')
    divProduct.setAttribute('data-id',product.id)

    const view = `<div class="producto__img">
                        <img src="${product.urlImg}" alt="">
                    </div>

                <div class="producto__details" >
                    <div class="cont-details cont-details--precio">$${product.values[0].price}</div>
                    <div class="cont-details cont-details--name">${product.name}</div>
                </div>`


    divProduct.innerHTML = view

    return divProduct
}

