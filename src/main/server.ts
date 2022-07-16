import 'module-alias/register'
import { MongoHelper } from '@/infra/repositories/mongodb/helper/mongo-helper'

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = (await import('@/main/config/app')).default
    app.listen(5000, () => {
      console.log('Server is running')
    })
  })
  .catch(console.error)
