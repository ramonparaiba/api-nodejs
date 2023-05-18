//import { openDb } from './configDB.js'
import {createTable} from './Controllers/Task.js'
import express from 'express'
const app = express()
app.use(express.json())

createTable()


app.get('/', (req, res)=>{
    res.send('Main')
})


app.post('/task', (req, res)=>{
    console.log(req.body)
    res.json({
        "statusCode": 200
    })
})

app.listen(8080, ()=> console.log('Rodando na 8080'))