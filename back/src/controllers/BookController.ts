import { Request, Response } from "express";

import { BookService } from "../services/BookService";


export class BookController{

    async create(request: Request, response: Response){
        
        const {titulo, genero, autor} = request.body

        const repositorio = new BookService()

        const livro = await repositorio.create({titulo, genero, autor})
        
        return response.status(201).json(livro)
    }
    
    async getAll(request: Request, response: Response){
        const rep = new BookService()

        const livros = await rep.getAll()

        return response.status(200).json(livros)
    }

    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const rep = new BookService()

        const livro = await rep.DeleteOne(id)

        if(livro instanceof Error){
            return response.status(400).json(livro.message)
        }

        return response.status(200).json({message:"livro deletado com sucesso!", livro})
    }

    

    async update(request: Request, response: Response){
        
        const {id} = request.params
        const {titulo, genero } = request.body

        const rep = new BookService()

        const result = await rep.update({id,titulo, genero})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"livro atualizado com sucesso!", result})
    }


    
}