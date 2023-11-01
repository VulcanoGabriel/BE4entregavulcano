import fs from "fs"

class cartManager {

    constructor(path) {

        this.path = path
        this.lista = []
    }

    getCarts = async () => {

        //buscamos si existe el documento con los datos

        if (fs.existsSync(this.path)) {

            //pasamos el contenido de existir el documento a una constante

            const carritos = await fs.promises.readFile(this.path, `utf-8`)

            //de la constante pasamos el contenido a this.lista en formato javascript

            this.lista = JSON.parse(carritos)
        }

        //de no existir el archivo escribimos el mismo con el contenido de this.lista

        else { await fs.promises.writeFile(this.path, JSON.stringify(this.lista)) }

        //devolvemos el contenido de los carritos para usarlo en los proximos metodos

        return this.lista
    }

    addCart = async (body) => {

        //usamos el metodo para traer todos los carritos

        let carritoId = await this.getCarts()

        //contamos la totalidad de carritos para darle un id que no se repita

        let carritoL = await carritoId.length

        //creamos un objeto molde para darle una id y un array nuevo por dentro para agregar productos proximamente al carrito

        const carritoMolde = {

            id: carritoL + 1,
            products: [body]
        }

        // traemos los carritos , y le agregamos el objeto nuevo lo escribimos en el archivo principal

        if (fs.existsSync(this.path)) {

            this.lista = carritoId
            this.lista.push(carritoMolde)
            await fs.promises.writeFile(this.path, JSON.stringify(this.lista))
        } else { return `no carrito molde` }

    }

    getCartId = async (id) => {


        let obtenerCarrito = await this.getCarts()

        this.lista = obtenerCarrito

        //de todos los carritos encontramos el que coincida por ID

        let encontrarCarrito = await this.lista.find((f) => f.id === id)


        if (encontrarCarrito) { return encontrarCarrito }

        //sino encontramos el carrito >>>>

        else { return `carrito no encontrado por ID` }
    }

    addProductCart = async (carritoNum, productoId) => {


        let carritosTodos = await this.getCarts()

        let carritoId = await this.getCartId(carritoNum)

        if (!carritoId) return (`no se encontro el carrito por el ID ingresado`)

        //buscamos en el carrito . products un producto que coincida por el que pasamos por parametros bajo el nombre productoId

        let productoEncontrado = carritoId.products.find(item => item.product === productoId)

        if (productoEncontrado) {

            //Si existe producto solo agregamos cantidad

            productoEncontrado.quantity++

        } else {

            //sino existe el producto agregamos cantidad y el id del producto

            const product = {

                product: productoId,
                quantity: 1,
            }
            carritoId.products.push(product)
        }



        const carritoI = carritosTodos.findIndex(item => item.id === carritoNum)
        if (carritoI !== -1) {
            carritosTodos[carritoI] = carritoId
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carritosTodos))
        return carritoId
    }

}

export default cartManager