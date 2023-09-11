import express, { Express } from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser';

import cors from 'cors'
import userRoutes from './routes'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4002
app.use(json())
app.use(cors())
app.use(userRoutes)

const uri: string = `mongodb://localhost:27017/users`

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

mongoose
.connect(uri, options)
.then(() =>
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    )
)
.catch((error) => {
    throw error
})