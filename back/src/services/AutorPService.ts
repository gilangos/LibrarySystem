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
        const rep = AppDataSource.getRepository(Autorperiodico)

        const autor = await rep.findOneBy({id: id})

        if(!autor){
            throw new Error("autor não existe!")
        }

        autor.nome = nome ? nome : autor.nome

        await rep.save(autor)

        return autor
    }


    async DeleteOne(id: string){

        const rep = AppDataSource.getRepository(Autorperiodico)

        const autor = await rep.findOneBy({id: id})

        if(!autor){
            throw new Error("autor não existe!")
        }

        await rep.remove(autor)


        return autor
    }




    async getAll(){
        const Autor = AppDataSource.getRepository(Autorperiodico)

        return Autor.find({relations:{
            periodicos: true
        }})
    }
}