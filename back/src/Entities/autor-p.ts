import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { User } from "./usuario";
import { v4 as uuid } from "uuid";

import { Periódico } from "./periodico";

@Entity("autores_periodicos")
export class Autorperiodico{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    nome: string

    @ManyToMany(()=> Periódico, periodico => periodico.Autores)
    @JoinTable({name: 'autores_peri', joinColumn:{ name:'autorId', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'periodicoId', referencedColumnName: 'id'}})
    periodicos: Periódico[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}