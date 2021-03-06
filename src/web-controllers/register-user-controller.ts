import { UserData } from '@/entities'
import { UseCase } from '@/usecases/port'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { badRequest, created, serverError } from '@/web-controllers/util/http-helper'

export class RegisterUserController {
  private readonly usecase: UseCase
  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest):Promise<HttpResponse> {
    try {
      if (!request.body.name || !request.body.email) return badRequest(new MissingParamError(request.body.name ? 'email' : 'name'))
      const userData: UserData = request.body
      const response = await this.usecase.perform(userData)
      if (response.isLeft()) {
        return badRequest(response.value)
      }
      if (response.isRight()) {
        return created(response.value)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
