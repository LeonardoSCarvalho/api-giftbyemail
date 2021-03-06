import { HttpResponse } from '@/web-controllers/ports'

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  body: error
})
