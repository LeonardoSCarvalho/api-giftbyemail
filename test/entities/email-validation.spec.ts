import { Email } from '@/entities'

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
  it('should not accept strings than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'l'.repeat(256) + '.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept domail part larger than 255 chars', () => {
    const email = 'local' + '@' + 'd'.repeat(256) + '.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept empty local part', () => {
    const email = '@mail.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept empty domain', () => {
    const email = 'any@'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept empty domain', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept empty domain', () => {
    const email = 'any email@email.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept local part with two dots', () => {
    const email = 'any..email@email.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept local part with ending dot', () => {
    const email = 'any.@email.com'
    expect(Email.validade(email)).toBeFalsy()
  })
  it('should not accept enail without an at-sign', () => {
    const email = 'anyemail.com'
    expect(Email.validade(email)).toBeFalsy()
  })
})
