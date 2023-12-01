import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export class UserController{

    async create(request: Request, response: Response){
        
        const {username, password} = request.body;


        const userService = new UserService()

        const user = await userService.Create({username,password})

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }
        

        return response.status(201).json({message: "usuario criado com sucesso!", user})
    }


    async getAll(request: Request, response: Response){
        const userService = new UserService()

        const users = await userService.getAll()

        return response.status(200).json(users)
    }



    async Delete(request: Request, response: Response){

        const { id } = request.params
        
        const userService = new UserService()

        const user = await userService.DeleteOne(id)

        if(user instanceof Error){
            return response.status(400).json(user.message)
        }

        return response.status(200).json({message:"usuario deletado com sucesso!"})
    }

    

    async update(request: Request, response: Response){
        const {id} = request.params
        const { username, password } = request.body

        const userService = new UserService()

        const result = await userService.update({id,username, password})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        return response.status(200).json({message:"usuario atualizado com sucesso !", result})
    }


    
    async login(request: Request, response: Response){


        const {username, password} = request.body

        

        if(!username){
            return response.status(400).json({message: "todos os campos são obrigatorios!"})
        }

        const userService = new UserService()

        const result = await userService.login({username,password})

        if(!result){
            return response.status(400).json({message: 'username ou password invalidos!'})
        }
        
        return response.status(200).json(result)
    }


    async AddLivro(request: Request, response: Response){
        const {usuarioId, livroId} = request.body

        const userService = new UserService()

        const result = await userService.AddLivro({usuarioId, livroId})

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(200).json({message: "livro adicionado a lista do usuario", result})
    }


    async RemLivro(request: Request, response: Response){
        const {usuarioId, livroId} = request.body

        const userService = new UserService()

        const result = await userService.RemoveLivro({usuarioId, livroId})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.status(200).json({message: "livro removido da lista do usuario!", result})
    }

    
}