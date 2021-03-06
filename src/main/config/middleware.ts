import { Express } from 'express'
import { cors, bodyPareser, contentType } from '@/main/middleware'

export default (app: Express): void => {
  app.use(bodyPareser)
  app.use(cors)
  app.use(contentType)
}
