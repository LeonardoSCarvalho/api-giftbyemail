
import { UserData } from '../../../../src/entities/user-data'
import { UserRepository } from '../../../../src/usecases/register-user-on-mailing-list/ports/user-repository'
import { RegisterUserOnMailingList } from '../../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  it('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect(response.value.name).toBe(name)
    expect((await user).name).toBe(name)
  })
  it('should not add user with invali email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any_invalid'
    const response = (await usecase.registerUserOnMailingList({ name, email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(response.name).toEqual('InvalidEmailError')
    expect(user).toBeNull()
  })
  it('should not add user with invali name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = ''
    const email = 'any@email.com'
    const response = (await usecase.registerUserOnMailingList({ name, email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(response.name).toEqual('InvalidNameError')
    expect(user).toBeNull()
  })
})
