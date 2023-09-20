import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { Document } from 'mongoose'
import moment from 'moment'

import { ApiError } from '../utils/ApiError.js'
import * as userService from '../services/user_service.js'
import { tokenModel as Token } from '../models/token_model.js'
import { tokenTypes } from '../constants/token_types.js'
import { IToken } from '../types/Token.js'

type TokenType = 'access' | 'refresh'

const generateToken = (
  userId: string,
  expires: moment.Moment,
  type: string,
  secret: string = process.env.JWT_SECRET,
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (
  token: string,
  userId: string,
  expires: moment.Moment,
  type: string,
  blacklisted = false,
): Promise<IToken> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  })
  return tokenDoc
}

const verifyToken = async (token: string, type: string): Promise<IToken> => {
  const payload = jwt.verify(token, process.env.JWT_SECRET) as { sub: string }
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

const generateAuthTokens = async (
  user: Document,
): Promise<{ access: { token: string; expires: Date }; refresh: { token: string; expires: Date } }> => {
  const accessTokenExpires = moment().add(process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES, 'minutes')
  const accessToken = generateToken(user.id.toString(), accessTokenExpires, tokenTypes.ACCESS)

  const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, 'days')
  const refreshToken = generateToken(user.id.toString(), refreshTokenExpires, tokenTypes.REFRESH)
  await saveToken(refreshToken, user.id.toString(), refreshTokenExpires, tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email')
  }
  const expires = moment().add(process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES, 'minutes')
  const resetPasswordToken = generateToken(user.id.toString(), expires, tokenTypes.RESET_PASSWORD)
  await saveToken(resetPasswordToken, user.id.toString(), expires, tokenTypes.RESET_PASSWORD)
  return resetPasswordToken
}

const generateVerifyEmailToken = async (user: Document): Promise<string> => {
  const expires = moment().add(process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, 'minutes')
  const verifyEmailToken = generateToken(user.id.toString(), expires, tokenTypes.VERIFY_EMAIL)
  await saveToken(verifyEmailToken, user.id.toString(), expires, tokenTypes.VERIFY_EMAIL)
  return verifyEmailToken
}

export {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
}
