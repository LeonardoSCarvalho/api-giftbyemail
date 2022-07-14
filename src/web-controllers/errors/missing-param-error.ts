export class MissingParamError extends Error {
  public readonly message: string = 'MissingParamError'
  constructor (param: string) {
    super(`Missing parameter from request: ${param}`)
  }
}
