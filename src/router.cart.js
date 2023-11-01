import { Router } from "express"
import cartsManager from "./cartsManager.js"

const router = Router()

router.post("/", async (req, res) => {

    const body = req.body

    const cartM1 = new cartsManager(`./src/cart.json`)

    await cartM1.addCart(body)

})

router.get("/:cid", async (req, res) => {

    const idCarrito = parseInt(req.params.cid)

    const cartM1 = new cartsManager(`./src/cart.json`)

    let contenidoId = await cartM1.getCartId(idCarrito)

    res.json(contenidoId.products)
})


router.post(`/cid/product/:pid`), async => {

    const cartM1 = new cartsManager(`./src/cart.json`)

    const idC = parseInt(req.params.cid)

    const idP = parseInt(req.params.pid)

    const cart = cartM1.addProductCart(idC, idP)

    if (cart) { res.json(`actualizado con exito`) }

    else { res.json(`problemas al actualizar producto`) }

}

export default router