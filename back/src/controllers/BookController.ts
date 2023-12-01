import { Request, Response } from "express";

import { BookService } from "../services/BookService";


export class BookController{

    async create(request: Request, response: Response){
        
        const {titulo, genero, autor} = request.body

        const livroService = new BookService()

        const livro = await livroService.create({titulo, genero, autor})
        
        return response.status(201).json({message: "livro criado com sucesso!", livro})
    }
    
    async getAll(request: Request, response: Response){
        const livroService = new BookService()

        const livros = await livroService.getAll()

        return response.status(200).json(livros)
    }

    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const livroService = new BookService()

        const livro = await livroService.DeleteOne(id)

        if(livro instanceof Error){
            return response.status(400).json(livro.message)
        }

        return response.status(200).json({message:"livro deletado com sucesso!", livro})
    }

    

    async update(request: Request, response: Response){
        
        const {id} = request.params
        const {titulo, genero } = request.body

        const livroService = new BookService()

        const result = await livroService.update({id,titulo, genero})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"livro atualizado com sucesso!", result})
    }


    
}