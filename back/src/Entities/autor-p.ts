import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { v4 as uuid } from "uuid";

import { Periódico } from "./periodico";

@Entity("autores_periodicos")
export class Autorperiodico{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    nome: string

    @OneToMany(()=> Periódico, periodico => periodico.Autor)
    // @JoinTable({name: 'autores_peri', joinColumn:{ name:'autorId', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'periodicoId', referencedColumnName: 'id'}})
    periodicos: Periódico[]

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}