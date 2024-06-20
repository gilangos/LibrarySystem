
import { Usuario} from '../Entities/usuario';
import { AppDataSource } from '../data-source';
import { Livro } from '../Entities/livro';


interface user{
    username: string,
    password: string
}





export class UserService{
    
    async Create({ username, password }: user){

        const repositorio = AppDataSource.getRepository(Usuario)

        const user = await repositorio.findOneBy({username})


        if(user){
            throw new Error('username ja existe, tente outro !');
        }
        
        const usuario = repositorio.create({
            username,
            password,
        })

        

        await repositorio.save(usuario)

        return usuario
    }


    async update({id, username, password}: {id: string, username: string, password: string}){
        const rep = AppDataSource.getRepository(Usuario)

        const user = await rep.findOneBy({id: id})

        if(!user){
            throw new Error('usuario não existe!')
        }

        
        user.username = username ? username : user.username
        user.password = password ? password : user.password

        await rep.save(user)

        return user
    }


    async DeleteOne(id: string){

        const rep = AppDataSource.getRepository(Usuario)

        const user = await rep.findOneBy({id: id})

        if(!user){
            throw new Error('usuario não existe!')
        }

        await rep.remove(user)


        return user
    }


    async getAll(){

        const rep = AppDataSource.getRepository(Usuario)

        const usuarios = await rep.find({relations:{
            livros: true
        }})

        return usuarios
    }

    async login({username, password}){
        
        const usuarioRep = AppDataSource.getRepository(Usuario)

        const userName = usuarioRep.findOne({
            where: {username: username, password: password},
            relations: ['livros'],
          })

        
        return userName 
    }

  

    async AddLivro({usuarioId, livroId}){
        const livroRepositorio = AppDataSource.getRepository(Livro)
        const UsuarioRepositorio = AppDataSource.getRepository(Usuario)

        const livro = await livroRepositorio.findOneBy({id: livroId})
        const usuario = await UsuarioRepositorio.findOneBy({id: usuarioId})

        if(!livro)
        {
            throw new Error('livro não existe!')
        }

        livro.usuario = usuario ? usuario : livro.usuario
        livro.disponivel = false

        await livroRepositorio.save(livro)
        await UsuarioRepositorio.save(usuario)

        return livro
    }



    async RemoveLivro({livroId}: {livroId: string}){
        const livroRepositorio = AppDataSource.getRepository(Livro)
        

        const livro = await livroRepositorio.findOneBy({id: livroId})
        // const usuario = await UsuarioRepositorio.findOneBy({id: usuarioId})

        if(!livro){
            throw new Error('livro não existe!')
        }

        livro.usuario = null
        livro.disponivel = true
        await livroRepositorio.save(livro)

        return livro
    }
}