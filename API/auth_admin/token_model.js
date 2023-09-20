import { Schema, model, SchemaTypes, Document, Model } from 'mongoose'
import { tokenTypes } from '../constants/token_types.ts'
import { IToken } from '../types/Token.js'

const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const tokenModel: Model<IToken> = model<IToken>('Token', tokenSchema)
