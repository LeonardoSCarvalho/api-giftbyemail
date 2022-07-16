import { Request, Response } from 'express'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'

export const adaptRoute = (controller: RegisterUserController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
