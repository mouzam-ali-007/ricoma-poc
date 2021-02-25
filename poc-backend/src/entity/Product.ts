import {
    Entity, BaseEntity, ObjectID, Column, ObjectIdColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Size } from './Size'
import { Color } from './Color'

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
    // @OneToMany(() => Size, item => item.product, { lazy: true, cascade: true })
    @Column()
    productSize: string[];

    @Field(() => [String])
    @Column()
    //  @OneToMany(() => Color, item => item.product, { lazy: true, cascade: true })
    productColor: string[];


    @Field(() => String)
    @Column()
    companyId: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date

}
