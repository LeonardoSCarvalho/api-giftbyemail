export class MissingParamError extends Error {
  constructor (param: string) {
    super(`Missing parameter from request: ${param}`)
  }
}
