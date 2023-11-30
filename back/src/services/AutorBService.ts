import { json } from "express";
import { User} from "../Entities/usuario";
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Livro } from "../Entities/livro";
import { Autor } from "../Entities/autor-b";




export class AutorBService{
    async create({nome}): Promise<Autor>{

        const rep = AppDataSource.getRepository(Autor)

        const autor = rep.create({
            nome
        })

        await rep.save(autor)
        

        return autor
    }


    async update({id, nome}: {id: string, nome:string}){
        const rep = AppDataSource.getRepository(Autor)

        const autor = await rep.findOneBy({id: id})

        if(!autor){
            throw new Error("Autor não existe!")
        }

        autor.nome = nome ? nome : autor.nome

        await rep.save(autor)

        return autor
    }


    async DeleteOne(id: string){

        const rep = AppDataSource.getRepository(Autor)

        const autor = await rep.findOneBy({id: id})

        if(!autor){
            throw new Error("autor não existe!")
        }

        await rep.remove(autor)


        return autor
    }




    async getAll(){
        const rep = AppDataSource.getRepository(Autor)

        return rep.find({relations: {livros: true}})
    }
}