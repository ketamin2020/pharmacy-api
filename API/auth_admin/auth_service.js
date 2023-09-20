import httpStatus from 'http-status'
import { ApiError } from '../utils/ApiError.js'
import { Document } from 'mongoose'
import { tokenTypes } from '../constants/token_types.js'
import * as userService from '../services/user_service.js'
import * as tokenService from '../services/token_service.js'
import { tokenModel as Token } from '../models/token_model.js'

const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<Document> => {
  const user = await userService.getUserByEmail(email)

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  return user
}

const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  })

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  await refreshTokenDoc.deleteOne()
}

const refreshAuth = async (
  refreshToken: string,
): Promise<{ access: { token: string; expires: Date }; refresh: { token: string; expires: Date } }> => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH)
    const user = await userService.getUserById(refreshTokenDoc.user)
    if (!user) {
      throw new Error()
    }
    await refreshTokenDoc.deleteOne()
    return tokenService.generateAuthTokens(user)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
  }
}

const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD)
    const user = await userService.getUserById(resetPasswordTokenDoc.user)
    if (!user) {
      throw new Error()
    }
    await userService.updateUserById(user.id, { password: newPassword })
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
  }
}

const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL)
    const user = await userService.getUserById(verifyEmailTokenDoc.user)
    if (!user) {
      throw new Error()
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL })
    await userService.updateUserById(user.id, { isEmailVerified: true })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed')
  }
}

export { loginUserWithEmailAndPassword, logout, refreshAuth, resetPassword, verifyEmail }
