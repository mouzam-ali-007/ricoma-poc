import {
    Entity, BaseEntity, ObjectID, Column, ObjectIdColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID

    @Field(() => String)
    @Column()
    name: string

    @Field(() => String)
    @Column()
    details: string

    @Field(() => String)
    @Column()
    image: string

    @Field(() => Number)
    @Column()
    quantity: number


    @Field(() => [String])
    @Column()
    productSize: string[];

    @Field(() => [String])
    @Column()
    productColor: string[];


    @Field(() => String)
    @Column()
    companyId: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date

}
