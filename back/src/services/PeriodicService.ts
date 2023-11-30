
import { Autorperiodico } from "../Entities/autor-p";
import { Periódico } from "../Entities/periodico";
import { AppDataSource } from "../data-source";



export class periodicService{
    
    async Create({ titulo, descrição , autor}){

        const repositorio = AppDataSource.getRepository(Periódico)
        const AutorRep = AppDataSource.getRepository(Autorperiodico)

        const autorExist = await AutorRep.findOneBy({nome: autor})


        const novoAutor = new Autorperiodico()
        novoAutor.nome = autor

       

        const periodico = repositorio.create({
            titulo,
            descrição,
            Autores: [autorExist ? autorExist : novoAutor]
        })

        if(autorExist){
            await AutorRep.save(autorExist)
            await repositorio.save(periodico)
            return periodico
        }

        await AutorRep.save(novoAutor)
        await repositorio.save(periodico)
        return periodico
    }


    async update({id, titulo, descrição}: {id: string, titulo: string, descrição: string}){
        const rep = AppDataSource.getRepository(Periódico)

        const periodico = await rep.findOneBy({id: id})

        if(!periodico){
            throw new Error("periodico não existe!")
        }

        
        periodico.titulo = titulo ? titulo : periodico.titulo
        periodico.descrição = descrição ? descrição : periodico.descrição

        await rep.save(periodico)

        return periodico
    }


    async DeleteOne(id: string){

        const rep = AppDataSource.getRepository(Periódico)

        const periodico = await rep.findOneBy({id: id})

        if(!periodico){
            throw new Error("periodico não existe!")
        }

        await rep.remove(periodico)


        return periodico
    }


    async getAll(){

        const rep = AppDataSource.getRepository(Periódico)

        const periodicos = await rep.find({relations: {
            Autores: true
        }})

        return periodicos
    }
}