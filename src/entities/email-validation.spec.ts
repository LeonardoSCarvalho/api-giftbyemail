import { Email } from './email'

describe('Email validator', () => {
  it('should not accept null string', () => {
    const email = null
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept empty string', () => {
    const email:string = ''
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should accept valid email', () => {
    const email = 'aby@mail.com'
    expect(Email.validade(email)).toBeTruthy()
  })
})
