import "dotenv/config"
import express from "express"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})