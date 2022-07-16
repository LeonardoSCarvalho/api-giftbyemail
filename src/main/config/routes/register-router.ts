import { Router } from 'express'
import { makeRegisterUserController } from '@/main/factories/register'
import { adaptRoute } from '@/main/config/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
