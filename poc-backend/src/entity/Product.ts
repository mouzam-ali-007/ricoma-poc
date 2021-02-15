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

    @Field(() => [Color])
    @OneToMany(() => Color, item => item.product, { lazy: true, cascade: true })
    productColors: Color[];

    @Field(() => [Size])
    @OneToMany(() => Size, item => item.product, { lazy: true, cascade: true })
    productSizes: Size[];

    @Field(() => String)
    @Column()
    companyId: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date

}
