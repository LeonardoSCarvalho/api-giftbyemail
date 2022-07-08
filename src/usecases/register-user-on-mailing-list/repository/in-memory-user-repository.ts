import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]
  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user.email)
    if (!exists) this.repository.push(user)
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const users = this.repository.filter(user => user.email === email)
    if (users.length === 0) return null
    return users[0]
  }

  async findAllUsers (): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  async exists (email: string): Promise<boolean> {
    if (await this.findUserByEmail(email)) return true
    return false
  }
}
