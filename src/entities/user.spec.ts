import { left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { User } from './user'

describe('User domain class', () => {
  it('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
  it('should not create user with invalid name (too few characyers)', () => {
    const invalidName = 'a         '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
  it('should not create user with invalid name (too many characyers)', () => {
    const invalidName = 'a'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})
