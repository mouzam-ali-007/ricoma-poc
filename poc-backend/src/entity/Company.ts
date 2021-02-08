import {
    Entity, BaseEntity, ObjectID, Column, ObjectIdColumn,
    CreateDateColumn, UpdateDateColumn
} from 'typeorm'

import { ObjectType, Field, ID } from 'type-graphql'
import { EncryptionTransformer } from 'typeorm-encrypted'

@ObjectType()
@Entity()
export class Company extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
    _id: ObjectID

    @Field()
    accessToken: string;

    @Field(() => String)
    @Column({ length: 200 })
    name: string

    @Field(() => String)
    @Column({ length: 200 })
    email: string

    @Field(() => String)
    @Column({ length: 200 })
    contact: string


    @Field(() => String)
    @Column({ length: 200 })
    address: string

    @Field(() => String)
    @Column({
        transformer: new EncryptionTransformer({
            key: 'secret',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56',
        }),
    })
    password: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date

}
