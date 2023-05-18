import {openDb} from '../configDB.js'

export async function createTable(){
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Tasks(id INTEGER PRIMARY KEY, nome TEXT, dificuldade INTEGER)')
    })
}
export async function insertTask(task){
    openDb().then(db => {
        db.run('INSERT INTO Tasks(nome, dificuldade)VALUES(?,?)', [task.nome, task.dificuldade])
    })
}
export async function updateTask(task){
    openDb().then(db => {
        db.run('UPDATE  Tasks SET nome=?, dificuldade=? WHERE id = ?', [task.nome, task.dificuldade, task.id])
    })
}

export async function selectTasks(){
    return openDb().then(async db => {
        return await db.all('SELECT * FROM Tasks')
    })
}
export async function selectTaskById(id){
    return openDb().then(async db => {
        return await db.get('SELECT * FROM Tasks WHERE id =?', [id] )
    })
}

export async function deleteTask(id){
    return openDb().then(async db => {
        return await db.get('DELETE FROM Tasks WHERE id =?', [id] )
    })
}