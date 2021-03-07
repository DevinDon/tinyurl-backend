import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from '@rester/core/dist/declares/typeorm';
import { IsDate } from 'class-validator';
import { Host } from './host.model';

@Entity('host')
export class HostEntity extends BaseEntity implements Host {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true })
  domain!: string;

  @IsDate()
  @Column()
  created!: Date;

  @IsDate()
  @Column()
  expired!: Date;

}
