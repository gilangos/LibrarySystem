import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export class UserController{

    async create(request: Request, response: Response){
        
        const {username, password} = request.body;

        console.log(username)

        const service = new UserService()

        const user = await service.Create({username,password})

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }
        

        return response.status(201).json(user)
    }


    async getAll(request: Request, response: Response){
        const rep = new UserService()

        const users = await rep.getAll()

        return response.status(200).json(users)
    }



    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const rep = new UserService()

        const user = await rep.DeleteOne(id)

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }

        return response.status(200).json({message:"usuario deletado com sucesso!"})
    }

    

    async update(request: Request, response: Response){
        const {id} = request.params
        const { username, password } = request.body

        const rep = new UserService()

        const result = await rep.update({id,username, password})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"usuario atualizado com sucesso", result})
    }


    

    
}