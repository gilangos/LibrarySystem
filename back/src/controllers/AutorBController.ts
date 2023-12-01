import { Request, Response } from "express";

import { BookService } from "../services/BookService";
import { AutorBService } from "../services/AutorBService";


export class AutorBController{

    async getAll(request: Request, response: Response){
        const autorService = new AutorBService()

        const livros = await autorService.getAll()

        return response.status(200).json(livros)
    }

    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const autorService = new AutorBService()

        const autor = await autorService.DeleteOne(id)

        if(autor instanceof Error){
            return response.status(400).json(autor.message)
        }

        return response.status(200).json({message:"autor deletado com sucesso!", autor})
    }

    

    async update(request: Request, response: Response){
        
        const {id} = request.params
        const {nome } = request.body

        const autorService = new AutorBService()

        const result = await autorService.update({id, nome})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"autor atualizado com sucesso!", result})
    }


    
}