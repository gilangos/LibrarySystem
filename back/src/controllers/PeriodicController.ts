import { Request, Response } from "express";
import { periodicService } from "../services/PeriodicService";


export class PeriodicController{

    async create(request: Request, response: Response){
        
        const {titulo, descrição, autor} = request.body;

        console.log(titulo)

        const periodicoService = new periodicService()

        const periodico = await periodicoService.Create({titulo,descrição, autor})

        if(periodico instanceof Error){
            return response.status(400).json(periodico.message)
        }
        

        return response.status(201).json({message: "periodico criado com sucesso!", periodico})
    }


    async getAll(request: Request, response: Response){
        const periodicoService = new periodicService()

        const periodicos = await periodicoService.getAll()

        return response.status(200).json(periodicos)
    }



    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const periodicoService = new periodicService()

        const periodico = await periodicoService.DeleteOne(id)

        if(periodico instanceof Error){
            return response.status(400).json(periodico.message)
        }

        return response.status(200).json({message:"periodico deletado com sucesso!", })
    }

    

    async update(request: Request, response: Response){
        const {id} = request.params
        const { titulo, descrição } = request.body

        const periodicoService = new periodicService()

        const result = await periodicoService.update({id,titulo, descrição})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"periodico atualizado com sucesso", result})
    }


    

    
}