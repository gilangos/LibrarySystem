import "reflect-metadata"
import express from 'express'
import { config } from 'dotenv'
import { AppDataSource} from "./data-source"

import { UserController } from "./controllers/UserController"


import { BookController} from "./controllers/BookController"
import { PeriodicController } from "./controllers/PeriodicController"
import { AutorPController } from "./controllers/AutorPController"
import { AutorBController } from "./controllers/AutorBController"



// 1. Sistema de Gerenciamento de Biblioteca

/*Um projeto onde você pode criar um banco de dados par
gerenciar livros, periódicos, autores, usuários e empréstimos.*/


AppDataSource.initialize().then(async ()=> {
    console.log("Banco rodando")

    const app = express()
    app.use(express.json())

    config()

    app.get('/usuarios', new UserController().getAll)
    app.post('/usuarios', new UserController().create)
    app.put('/usuarios/:id', new UserController().update)
    app.delete('/usuarios/:id', new UserController().Delete)

    app.get('/livros',new BookController().getAll)
    app.post('/livros',new BookController().create)
    app.put('/livros/:id',new BookController().update)
    app.delete('/livros/:id',new BookController().Delete)



    app.get('/periodicos',new PeriodicController().getAll)
    app.post('/periodicos',new PeriodicController().create)
    app.put('/periodicos/:id',new PeriodicController().update)
    app.delete('/periodicos/:id',new PeriodicController().Delete)


    app.get('/autores-periodicos',new AutorPController().getAll)
    app.post('/autores-periodicos',new AutorPController().create)
    app.put('/autores-periodicos/:id',new AutorPController().update)
    app.delete('/autores-periodicos/:id',new AutorPController().Delete)


    app.get('/autores-livros',new AutorBController().getAll)
    app.post('/autor-livro',new AutorBController().create)
    app.put('/autor-livro/:id',new AutorBController().update)
    app.delete('/autor-livro/:id',new AutorBController().Delete)


    app.listen(3003, ()=>{
        console.log("server is running on port 5050")
    })
})


