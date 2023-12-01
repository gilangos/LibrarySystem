
import { AppDataSource } from "../data-source";
import { Autor } from "../Entities/autor-b";


export class AutorBService{

    async update({id, nome}: {id: string, nome:string }){
        const autorRepositorio = AppDataSource.getRepository(Autor)

        const autor = await autorRepositorio.findOneBy({id: id})

        if(!autor){
            throw new Error("Autor não existe!")
        }

        autor.nome = nome ? nome : autor.nome

        await autorRepositorio.save(autor)

        return autor
    }


    async DeleteOne(id: string){

        const autorRepositorio = AppDataSource.getRepository(Autor)

        const autor = await autorRepositorio.findOneBy({id: id})

        if(!autor){
            throw new Error("autor não existe!")
        }

        await autorRepositorio.remove(autor)
        return autor
    }

    

    async getAll(){

        const autorRepositorio = AppDataSource.getRepository(Autor)
        return autorRepositorio.find({relations: {livros: true}})
    }
}