import { json } from "express";
import { User} from "../Entities/usuario";
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Livro } from "../Entities/livro";


interface user{
    username: string,
    password: string
}


export class UserService{
    
    async Create({ username, password }: user){

        console.log(username, password)

        const repositorio = AppDataSource.getRepository(User)

        const user = await repositorio.findOneBy({username})


        if(user){
            throw new Error("username nulo !");
        }
        
        const usuario = repositorio.create({
            username,
            password,
        })

        

        await repositorio.save(usuario)

        return usuario
    }


    async update({id, username, password}: {id: string, username: string, password: string}){
        const rep = AppDataSource.getRepository(User)

        const user = await rep.findOneBy({id: id})

        if(!user){
            throw new Error("usuario não existe!")
        }

        
        user.username = username ? username : user.username
        user.password = password ? password : user.password

        await rep.save(user)

        return user
    }


    async DeleteOne(id: string){

        const rep = AppDataSource.getRepository(User)

        const user = await rep.findOneBy({id: id})

        if(!user){
            throw new Error("usuario não existe!")
        }

        await rep.remove(user)


        return user
    }


    async getAll(){

        const rep = AppDataSource.getRepository(User)

        const usuarios = await rep.find({relations:{
            livros: true
        }})

        return usuarios
    }
}