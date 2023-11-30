import { Request, Response } from "express";

import { BookService } from "../services/BookService";
import { AutorBService } from "../services/AutorBService";
import { AutorPService } from "../services/AutorPService";


export class AutorPController{

    async create(request: Request, response: Response){
        
        const {nome} = request.body;

        const repositorio = new AutorPService()

        const autor = await repositorio.create({nome})
        
        return response.status(201).json(autor)
    }
    
    async getAll(request: Request, response: Response){
        const rep = new AutorPService()

        const livros = await rep.getAll()

        return response.status(200).json(livros)
    }

    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const rep = new AutorPService()

        const autor = await rep.DeleteOne(id)

        if(autor instanceof Error){
            return response.status(400).json(autor.message)
        }

        return response.status(200).json({message:"autor deletado com sucesso!", autor})
    }

    

    async update(request: Request, response: Response){
        
        const {id} = request.params
        const {nome } = request.body

        const rep = new AutorPService()

        const result = await rep.update({id, nome})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"autor atualizado com sucesso!", result})
    }


    
}