import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@test/src/usecases/register-user-on-mailing-list/repository'

describe('Register web controller', () => {
  it('sould return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com'
      }
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
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
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
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
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  it('sould return status code 400 when request missing user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name')
  })

  it('sould return status code 400 when request missing user email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'anyname'
      }
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email')
  })
})
