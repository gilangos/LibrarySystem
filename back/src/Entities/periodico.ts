import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid";
import { Autorperiodico } from "./autor-p";
import { Autor } from "./autor-b";

@Entity("periodicos")
export class Periódico{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    titulo: string

    @Column('varchar')
    descrição: string

    @ManyToOne(()=> Autorperiodico, (Autorperiodico) => Autorperiodico.periodicos)
    Autor: Autor
    

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}