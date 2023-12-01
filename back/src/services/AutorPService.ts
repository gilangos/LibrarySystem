import { json } from "express";

import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Livro } from "../Entities/livro";
import { Autorperiodico } from "../Entities/autor-p";


export class AutorPService{
    // async create({nome} ){

    //     const autorRepositorio = AppDataSource.getRepository(Autorperiodico)

    //     const autor = autorRepositorio.create({
    //         nome
    //     })

    //     await autorRepositorio.save(autor)

    //     return autor
    // }


    async update({id, nome}){
        const autorRepositorio = AppDataSource.getRepository(Autorperiodico)

        const autor = await autorRepositorio.findOneBy({id: id})

        if(!autor){
            throw new Error("autor não existe!")
        }

        autor.nome = nome ? nome : autor.nome

        await autorRepositorio.save(autor)

        return autor
    }


    async DeleteOne(id: string){

        const autorRepositorio = AppDataSource.getRepository(Autorperiodico)

        const autor = await autorRepositorio.findOneBy({id: id})

        if(!autor){
            throw new Error("autor não existe!")
        }

        await autorRepositorio.remove(autor)


        return autor
    }




    async getAll(){
        const autorRepositorio = AppDataSource.getRepository(Autorperiodico)

        return autorRepositorio.find({relations:{
            periodicos: true
        }})
    }
}