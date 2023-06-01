import { injectable } from 'inversify'
import {
  Collection,
  Document,
  Filter,
  ObjectId,
  OptionalUnlessRequiredId,
} from 'mongodb'

import { IGenericDAO } from '../IGenericDAO'

@injectable()
export class GenericDAO<T extends Document> implements IGenericDAO<T> {
  protected _collection: Collection<T>

  async create(obj: T): Promise<string> {
    const result = await this._collection.insertOne(
      obj as OptionalUnlessRequiredId<T>
    )

    return result.insertedId.toString()
  }

  async update(id: string, obj: any): Promise<boolean> {
    const filter = { _id: new ObjectId(id) } as Filter<T>
    const options = { upsert: false }

    const result = await this._collection.updateOne(
      filter,
      { $set: obj },
      options
    )

    return result.matchedCount == 1
  }

  async delete(id: string): Promise<boolean> {
    const filter = { _id: new ObjectId(id) } as Filter<T>
    const result = await this._collection.deleteOne(filter)
    return result.deletedCount == 1
  }

  async findOne(id: string): Promise<T> {
    const filter = { _id: new ObjectId(id) } as Filter<T>
    const result = await this._collection.findOne(filter)
    return result as T // casting
  }

  async find(criteria: any, options?: any): Promise<T[]> {
    const opt = options ? options : {}
    const cursor = this._collection.find(criteria, options)

    const documents: T[] = []
    for await (let d of cursor) {
      documents.push(d as T)
    }

    return documents
  }
}