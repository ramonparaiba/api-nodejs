import {openDb} from '../configDB.js'

export async function createTable(){
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Tasks(id INTEGER PRIMARY KEY, nome TEXT, dificuldade INTEGER)')
    })
}