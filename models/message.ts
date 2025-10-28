import mongoose, { Schema, Document } from 'mongoose'

interface IMessage extends Document {
  name: string
  email: string
  message: string
  timestamp: Date
}

const MessageSchema: Schema<IMessage> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
})

export default mongoose.model<IMessage>('Message', MessageSchema)
