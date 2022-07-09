import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  it('should return if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })
    const user = await userRepo.findUserByEmail(email)
    expect(user).toBeDefined()
    expect(user.name).toBe(name)
  })

  it('should return all users in the repository', async () => {
    const users: UserData[] = [{ name: 'any_name', email: 'any@mail.com' }, { name: 'any2_name', email: 'any@mail.com' }]
    const userRepo = new InMemoryUserRepository(users)
    const returnedUsers = await userRepo.findAllUsers()
    expect(returnedUsers.length).toBe(2)
  })
})
