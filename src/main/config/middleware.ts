import { Express } from 'express'
import { bodyPareser } from '@/main/config/middleware/body-parse'
import { cors } from '@/main/config/middleware/cors'
import { contentType } from './middleware/content-type'
export default (app: Express): void => {
  app.use(bodyPareser)
  app.use(cors)
  app.use(contentType)
}
