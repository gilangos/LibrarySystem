import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { periodicService } from "../services/PeriodicService";


export class PeriodicController{

    async create(request: Request, response: Response){
        
        const {titulo, descrição, autor} = request.body;

        console.log(titulo)

        const service = new periodicService()

        const user = await service.Create({titulo,descrição, autor})

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }
        

        return response.status(201).json(user)
    }


    async getAll(request: Request, response: Response){
        const rep = new periodicService()

        const users = await rep.getAll()

        return response.status(200).json(users)
    }



    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const rep = new periodicService()

        const user = await rep.DeleteOne(id)

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }

        return response.status(200).json({message:"periodico deletado com sucesso!"})
    }

    

    async update(request: Request, response: Response){
        const {id} = request.params
        const { titulo, descrição } = request.body

        const rep = new periodicService()

        const result = await rep.update({id,titulo, descrição})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"periodico atualizado com sucesso", result})
    }


    

    
}