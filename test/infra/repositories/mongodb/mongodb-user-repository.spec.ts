import { MongoHelper } from '@/infra/repositories/mongodb/helper/mongo-helper'
import { MongodbUserRepository } from '@/infra/repositories/mongodb/mongodb-user-repositoty'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(() => {
    MongoHelper.clearCollection('users')
  })
  it('when user is added, it should exists', async () => {
    const userRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'anyname',
      email: 'any@mail.com'
    })
    expect(await userRepository.exists('any@mail.com')).toBeTruthy()
  })
})
