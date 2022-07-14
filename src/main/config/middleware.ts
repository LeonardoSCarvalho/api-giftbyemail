import { Express } from 'express'
import { bodyPareser } from './middleware/body-parse'
export default (app: Express): void => {
  app.use(bodyPareser)
}
