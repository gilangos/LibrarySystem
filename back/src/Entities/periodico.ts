import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from "typeorm"
import { User } from "./usuario";
import { v4 as uuid } from "uuid";
import { Autor } from "./autor-b";
import { Autorperiodico } from "./autor-p";

@Entity("periodicos")
export class Periódico{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    titulo: string


    @Column('varchar')
    descrição: string


    @ManyToMany(()=> Autorperiodico, (Autorperiodico) => Autorperiodico.periodicos)
    Autores: Autorperiodico[] 

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}