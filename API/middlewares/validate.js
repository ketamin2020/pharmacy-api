import { NextFunction, Request, Response } from 'express'
import Joi, { ObjectSchema, ValidationResult } from 'joi'
import httpStatus from 'http-status'
import { pick } from '../utils/pick.js'
import { ApiError } from '../utils/ApiError.ts'

type ValidateFunction = (schema: ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => void

export const validate: ValidateFunction = (schema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']) as ObjectSchema<any>
  const object = pick(req, Object.keys(validSchema))
  const { value, error }: ValidationResult<any> = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ')

    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
  }
  Object.assign(req, value)
  return next()
}
