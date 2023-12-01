import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid";
import { Autor } from "./autor-b";
import { Usuario } from "./usuario";


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

    @ManyToOne(()=> Usuario, (Usuario) => Usuario.livros)
    usuario: Usuario;

    @ManyToOne(()=> Autor, (Autor) => Autor.livros)
    autor: Autor

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
