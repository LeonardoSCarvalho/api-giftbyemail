import { UserRepository } from '../ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]
  constructor (repository: UserData[]) {
    this.repository = repository
  }

  add (user: UserData): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findUserByEmail (email: string): Promise<UserData> {
    return null
  }

  findAllUsers (): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  exists (email: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
