import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from '@rester/core/dist/declares/typeorm';
import { IsDate, IsIP, Length } from '@rester/core/dist/declares/validator';
import { IncomingHttpHeaders } from 'http';

@Entity('access')
export class AccessEntity extends BaseEntity {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Length(3, 10)
  @Column()
  method!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  params?: string;

  @IsDate()
  @Column()
  timestamp!: Date;

  @IsIP()
  @Column()
  ip!: string;

  @Column()
  headers!: IncomingHttpHeaders;

  @Column()
  request!: string;

}
