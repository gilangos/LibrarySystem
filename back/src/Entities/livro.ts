import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./usuario";
import { v4 as uuid } from "uuid";
import { Autor } from "./autor-b";


@Entity("livros")
export class Livro {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    titulo: string

    @Column('varchar')
    genero: string;

    @Column('boolean')
    disponivel: boolean;

    @ManyToOne(()=> User, (User) => User.livros)
    usuario: User;

    @ManyToOne(()=> Autor, (Autor) => Autor.livros)
    autor: Autor

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
