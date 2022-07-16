import { UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { MongoHelper } from '@/infra/repositories/mongodb/helper/mongo-helper'

export class MongodbUserRepository implements UserRepository {
  async add (user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user.email)
    if (!exists) await userCollection.insertOne(user)
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email })
    return result as unknown as UserData
  }

  async findAllUsers (): Promise<UserData[]> {
    return await MongoHelper.getCollection('users').find({}).toArray() as unknown as UserData[]
  }

  async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    return !!result
  }
}
