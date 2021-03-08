import { IsDate } from 'class-validator';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Host } from './host.model';

@Entity('host')
export class HostEntity extends BaseEntity implements Host {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true, nullable: false })
  domain!: string;

  @IsDate()
  @Column()
  created!: Date;

  @IsDate()
  @Column()
  expired!: Date;

}
