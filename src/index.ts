import express from "express"
import router from "./routes"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['*']
}))

app.get('/', (req: express.Request, res: express.Response) => {
    return res.send('Server is Running')
})

app.use(router)

app.listen(
    5000,
    process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    () => {
        console.log("Server is started")
    })