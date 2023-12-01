
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Livro } from "../Entities/livro";
import { Autor } from "../Entities/autor-b";


interface livro{
    titulo: string,
    genero: string,
    autor: string
}


export class BookService{
    async create({titulo, genero, autor}: livro ): Promise<Livro>{

        const livroReposit = AppDataSource.getRepository(Livro)
        const autorRep = AppDataSource.getRepository(Autor)
        
        const novolivroAutor = new Autor()
        novolivroAutor.nome = autor


        const AutorExist = await autorRep.findOneBy({nome: autor})
        
        
        const novoLivro = livroReposit.create({
            titulo,
            genero,
            autor: AutorExist ? AutorExist : novolivroAutor
        })

        if(AutorExist){
            await autorRep.save(AutorExist)
            await livroReposit.save(novoLivro)
            return novoLivro
        }

        await autorRep.save(novolivroAutor)
        await livroReposit.save(novoLivro)
        return novoLivro
    }


    async update({id, titulo , genero}: {id: string, titulo: string, genero: string}){
        const livroRepositorio = AppDataSource.getRepository(Livro)

        const livro = await livroRepositorio.findOneBy({id: id})

        if(!livro){
            throw new Error("livro não existe!")
        }

        livro.titulo = titulo ? titulo : livro.titulo
        livro.genero = genero ? genero : livro.genero

        await livroRepositorio.save(livro)

        return livro
    }


    async DeleteOne(id: string){

        const livroRepositorio = AppDataSource.getRepository(Livro)

        const livro = await livroRepositorio.findOneBy({id: id})

        if(!livro){
            throw new Error("livro não existe!")
        }

        await livroRepositorio.remove(livro)


        return livro
    }




    async getAll(){
        const livroReposit = AppDataSource.getRepository(Livro)

        return livroReposit.find({relations: {usuario: true, autor: true}})
    }
}