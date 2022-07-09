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
  it('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com'
    expect(Email.validade(email)).toBeFalsy()
  })
})