import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UseCase } from '@/usecases/port'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'

describe('Register web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterUserController = new RegisterUserController(usecase)
  class ErrorThrowUseCaseStub implements UseCase {
    public async perform (request: any): Promise<void> {
      throw new Error('any error')
    }
  }
  const errorThrowUseCaseStub = new ErrorThrowUseCaseStub()
  it('sould return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(request.body)
  })

  it('sould return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidName)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  it('sould return status code 400 when request contains invalid email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'Aanyname',
        email: '@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  it('sould return status code 400 when request missing user name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingName)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name')
  })

  it('sould return status code 400 when request missing user email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'anyname'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email')
  })

  it('sould return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com'
      }
    }
    const controller: RegisterUserController = new RegisterUserController(errorThrowUseCaseStub)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
