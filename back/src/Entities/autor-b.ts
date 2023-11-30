import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./usuario";
import { v4 as uuid } from "uuid";
import { Livro } from "./livro";

@Entity("autores_livros")
export class Autor{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    nome: string

    @OneToMany(()=> Livro, (Livro) => Livro.autor)
    livros: Livro[];


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
