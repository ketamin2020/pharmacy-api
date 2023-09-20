import passport from 'passport'
import { roleRights } from '../constants/roles_rights.ts'
import httpStatus from 'http-status'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError.ts'
import { Actions } from '../constants/roles_rights.ts'
const verifyCallback =
  (req: Request, resolve: () => void, reject: (error: ApiError) => void, requiredRights: string[]) =>
  async (err: any, user: any, info: any): Promise<void> => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))
    }
    req.user = user

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role_id)
      const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight))
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'))
      }
    }

    resolve()
  }

const auth =
  (...requiredRights: Actions[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next,
      )
    })
      .then(() => next())
      .catch((err) => next(err))
  }

export { auth }
