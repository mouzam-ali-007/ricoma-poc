import {
    Entity, BaseEntity, ObjectID, Column, ObjectIdColumn,
    CreateDateColumn, UpdateDateColumn
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

    @Field(() => String)
    @Column()
    productSizes: String;

    @Field(() => String)
    @Column()
    productColors: String;

    @Field(() => String)
    @Column()
    companyId: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date

}
