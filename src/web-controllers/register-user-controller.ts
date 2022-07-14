import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, created } from './util/http-helper'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList
  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest):Promise<HttpResponse> {
    if (!request.body.name || !request.body.email) return badRequest(new MissingParamError(request.body.name ? 'email' : 'name'))
    const userData: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(userData)
    if (response.isLeft()) {
      return badRequest(response.value)
    }
    if (response.isRight()) {
      return created(response.value)
    }
  }
}
