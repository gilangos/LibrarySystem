import { Request, Response } from 'express';


import { AutorPService } from '../services/AutorPService';


export class AutorPController{
   
    async getAll(request: Request, response: Response){
        const AutorService = new AutorPService()

        const livros = await AutorService.getAll()

        return response.status(200).json(livros)
    }

    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const AutorService = new AutorPService()

        const autor = await AutorService.DeleteOne(id)

        if(autor instanceof Error){
            return response.status(400).json(autor.message)
        }

        return response.status(200).json({message:'autor deletado com sucesso!', autor})
    }

    

    async update(request: Request, response: Response){
        
        const {id} = request.params
        const {nome } = request.body

        const AutorService = new AutorPService()

        const result = await AutorService.update({id, nome})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:'autor atualizado com sucesso!', result})
    }


    
}