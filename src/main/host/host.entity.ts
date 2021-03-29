import { Column, Entity, MongoEntity, ObjectID, PaginationParam } from '@rester/orm';
import { Host, HostID } from './host.model';

@Entity({ name: 'host' })
export class HostEntity extends MongoEntity<Host> implements Host {

  @Column()
  _id: ObjectID;

  @Column({ index: true, unique: true })
  domain: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  expiredAt?: Date;

  async getRandomList({ take }: Pick<PaginationParam, 'take'>) {
    return { list: await this.collection.aggregate([{ $sample: { size: take } }]).toArray() };
  }

  async insertOne(host: Host) {
    const id = await this.collection
      .insertOne(host)
      .then(result => result.insertedId);
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async deleteOne(id: HostID) {
    await this.collection.deleteOne({ _id: new ObjectID(id) });
    return [id];
  }

  async updateOne(id: HostID, host: Partial<Host>) {
    await this.collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: host },
    );
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async findOne(id: HostID) {
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

}

export type HostCollection = HostEntity['collection'];
