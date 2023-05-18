//import { openDb } from './configDB.js'
import {createTable, 
    insertTask,
    updateTask,
    selectTasks,
    selectTaskById,
    deleteTask} from './Controllers/Task.js'
import express from 'express'
const app = express()
app.use(express.json())

createTable()


app.get('/', (req, res)=>{
    res.send('Main')
})

app.get('/tasks', async (req, res)=>{
    let tasks = await selectTasks()
    res.json(tasks)
})
app.get('/task', async (req, res)=>{
    let tasks = await selectTaskById(req.body.id)
    res.json(tasks)
})

app.post('/task', (req, res)=>{
    insertTask(req.body)
    res.json({
        "statusCode": 200,
        "message" : "Tarefa cadastrada com sucesso"
    })
})

app.put('/task', (req, res)=>{
    
    if(req.body && !req.body.id){
        res.json({
            "statusCode": 400,
            "msg" : "Insira o Id da tarefa"
        })
    }else{
        updateTask(req.body)
        res.json({
            "statusCode": 200
        })
    }
})

app.delete('/task', async (req, res)=>{
    let tasks = await deleteTask(req.body.id)
    res.json(tasks)
})


app.listen(8080, ()=> console.log('Rodando na 8080'))