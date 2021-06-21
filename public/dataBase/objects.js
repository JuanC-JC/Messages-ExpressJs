//constructor de objetos "product"
class Product{

    constructor (id,nombre,valorAnterior,url,descripcion,numReseñas,informacion){

        this.id = id
        this.name = nombre
        this.beforeValue = valorAnterior
        this.urlImg = url
        this.descriptions = descripcion
        this.feedback = numReseñas
        this.info = informacion

        this.values = []
        this.unitsTypes = []

        this.stocks = {}
        this.colorsTypes = {}        

    }


    addUnitType(num,price){

        this.unitsTypes.push(num)

        this.values.push({unitType:num,price:price})

    }

    addColorType(color,hex,stock){

        if(!this.stocks.hasOwnProperty(color)){
        
            this.stocks[color] = {quantity:stock}

            this.colorsTypes[color] = {hex:hex}
        }
    }
 
}

//constructor de objetos "tienda"
class Tienda{

    constructor(productos=[]){
        this.products = productos; // [lista...]
        this.lastId = 1;
        
        this.producToSell = {id:null,
            name:null,
            unitType:null,
            colorType:null,
            units:null,
            price:null,
            total:null,
        };

        this.costShipping = 0
        this.discount = 0
        window.localStorage.getItem('cart')
        ? this.cart = JSON.parse(window.localStorage.getItem('cart'))
        : this.cart = []

    }

    addUnitType(id,num,price){
        let modifyProduct = this.findProductById(id)

        modifyProduct.addUnitType(num,price)
    }

    addColorType(id,color,hex,stock){
        let modifyProduct = this.findProductById(id)

        modifyProduct.addColorType(color,hex,stock)
    }

    //añadir producto
    addProduct(nombre,valorAnterior,url,descripcion,reseña,informacion){
        try{

            if(arguments.length < 2){
                throw new Error('product needs name and value')
            }

            let product = new Product(this.lastId,nombre,valorAnterior,url,descripcion,reseña,informacion)
            this.products.push(product)
            this.lastId++

        }catch(err){
            console.log(err)
        }

    }

    //eliminar producto
    deleteProduct(id){
        let product = this.findProductById(id)

        this.products = this.products.filter(elemento=> elemento.id !== id)
    }


    /**
     * retorna el nuevo stock del producto
     * @param id -producto @param quantity cuanto se vendera del stock
     */
    sellProduct(id,color, quantity){
        try{
            let productToSell = this.findProductById(id)

            if(!productToSell.stocks.hasOwnProperty(color)){
                throw new Error(`sellProduct --> Msg: el producto ${productToSell.name} no contiene el color ${color}`)
            }


            if(productToSell.stocks[color].quantity - quantity >= 0 ){

                productToSell.stocks[color].quantity -= quantity

                return productToSell.stocks[color].quantity

            }else{
                throw new Error(`${productToSell.name} sin stock para esta venta`)
            }

            
        }catch(err){
            console.log(err)
            return -1
        }
    }

    /**
     * retorna el nuevo stock del producto
     * @param id -producto @param quantity cuanto ingresara del producto
     */
    supplyProduct(id,color,quantity){
        try{
            let productToInsert = this.findProductById(id)

            if(!productToInsert.stocks.hasOwnProperty(color)){
                throw new Error(`supplyProduct --> Msg: el producto ${productToInsert.name} no contiene el color ${color}`)
            }

            productToInsert.stocks[color].quantity += quantity

            productToInsert.stock += quantity    
           
            return productToInsert.stock

        }catch(err){
            console.log(err)
            return -1
        }
    }

    /**
     * retorna el producto con el id indicado
     * @param id - producto
     */
    findProductById(id){

        let product = this.products.find(product => product.id == id)

        if(product !== undefined){

            //saber si el producto esta disponible......  //url, 1 descripcion,, 1 tipo de unidad, 1 tipo de color
            return product
        }
        else{
            throw new Error(`no existe ningun producto con el id #${id} en el inventario`)
        }
    }

    addProductToCart(product){
        this.cart.push(product)
    }

    removeProductToCart(product){
        this.cart.splice(this.cart.indexOf(product),1)
    }

    totalValueCart(){
        let totalValue = 0;

        this.cart.forEach(element=>{
            totalValue += element.total
        })
    
        return totalValue
    }

    totalToPay(){

        const totalCart = this.totalValueCart()

        if(totalCart == 0){
            return 0 
        }else{
            return totalCart + this.costShipping - this.discount
        }
    }

}


export{Tienda}



