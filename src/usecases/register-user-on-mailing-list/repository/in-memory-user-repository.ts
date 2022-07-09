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
    const user = this.repository.find(user => user.email === email)
    return user || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (email: string): Promise<boolean> {
    if (await this.findUserByEmail(email)) return true
    return false
  }
}
