import { Express } from 'express'
import { bodyPareser } from '@/main/config/middleware/body-parse'
import { cors } from '@/main/config/middleware/cors'
export default (app: Express): void => {
  app.use(bodyPareser)
  app.use(cors)
}
