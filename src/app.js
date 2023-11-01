import express from "express"
import products from "./router.products.js"
import carts from "./router.cart.js"

const app = express()

// json nos deja usar el formato con compatibilidad
//urlencoded aumenta la compatibilidad en transferencia de datos

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//pantalla principal con saludo

app.get("/", (req, res) => {
    res.send("ok")
})


// rutas

app.use("/api/products", products)

app.use("/api/carts", carts)


app.listen(8080, () => { console.log("<<<<<<<<<<<<<<<<<<<<<<<<<servidor corriendo....................") })