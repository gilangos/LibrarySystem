
// import { Autor } from "../Entities/autor-b";
import { Autorperiodico } from "../Entities/autor-p";
import { Periódico } from "../Entities/periodico";
import { AppDataSource } from "../data-source";



export class periodicService{
    
    async Create({ titulo, descrição , autor}){

        const periodicoRepositorio = AppDataSource.getRepository(Periódico)
        const AutorRep = AppDataSource.getRepository(Autorperiodico)

        // const autorExist = await AutorRep.findOne(autor)

        const AutorExist = await AutorRep.findOneBy({ nome: autor})

        const novoAutor = new Autorperiodico()
        novoAutor.nome = autor

    
        const periodico =  periodicoRepositorio.create({
            titulo,
            descrição,
            Autor: AutorExist ? AutorExist : novoAutor 
        })

        if(AutorExist){
            // await AutorRep.save(AutorExist)
            await periodicoRepositorio.save(periodico)
            return periodico
        }

        await AutorRep.save(novoAutor)
        await periodicoRepositorio.save(periodico)

        return periodico
        
    }


    async update({id, titulo, descrição}: {id: string, titulo: string, descrição: string}){
        const periodicoRepositorio = AppDataSource.getRepository(Periódico)

        const periodico = await periodicoRepositorio.findOneBy({id: id})

        if(!periodico){
            throw new Error("periodico não existe!")
        }

        
        periodico.titulo = titulo ? titulo : periodico.titulo
        periodico.descrição = descrição ? descrição : periodico.descrição

        await periodicoRepositorio.save(periodico)

        return periodico
    }


    async DeleteOne(id: string){

        const periodicoRepositorio = AppDataSource.getRepository(Periódico)

        const periodico = await periodicoRepositorio.findOneBy({id: id})

        if(!periodico){
            throw new Error("periodico não existe!")
        }

        await periodicoRepositorio.remove(periodico)


        return periodico
    }


    async getAll(){

        const periodicoRepositorio = AppDataSource.getRepository(Periódico)

        const periodicos = await periodicoRepositorio.find({relations: {
            Autor: true
        }})

        return periodicos
    }
}