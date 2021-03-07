import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from '@rester/core/dist/declares/typeorm';
import { IsDate, IsUrl } from 'class-validator';
import { Link } from './link.model';

@Entity('link')
export class LinkEntity extends BaseEntity implements Link {

  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ unique: true })
  id!: string;

  @IsUrl()
  @Column()
  origin!: string;

  @IsDate()
  @Column()
  timestamp!: Date;

}
