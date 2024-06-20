import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Livro } from './livro'
import {v4 as uuid } from 'uuid'

@Entity('usuarios')
export class Usuario{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 100, nullable: false})
    username: string

    @Column('varchar', {length: 100, nullable:false})
    password: string

    @OneToMany(() => Livro, (livro) => livro.usuario)
    livros: Livro[];


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
