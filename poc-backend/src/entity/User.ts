import { Entity, BaseEntity, ObjectID, Column, ObjectIdColumn } from 'typeorm'

import { ObjectType, Field, ID } from 'type-graphql'
import { EncryptionTransformer } from 'typeorm-encrypted'
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID
  @Field(() => String)
  @Column()
  firstname: string

  @Field(() => String)
  @Column()
  lastname: string

  @Field(() => String)
  @Column()
  email: string

  @Field(() => Number)
  @Column()
  age: number

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
}
