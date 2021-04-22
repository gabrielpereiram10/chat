import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"
import { v4 as uuid4 } from "uuid"


@Entity("users")
class User {
    @PrimaryColumn()
    id: string

    @Column()
    email: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid4()
        }
    }
}

export { User }