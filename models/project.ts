import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  name: string
  repo?: string
  demo?: string
  image: Buffer
  description?: string
  completion: number
  timestamp: Date
}

const ProjectSchema: Schema<IProject> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  repo: {
    type: String,
    trim: true,
    match: /^https?:\/\/.+$/,
  },
  demo: {
    type: String,
    trim: true,
    match: /^https?:\/\/.+$/,
  },
  image: {
    type: Buffer,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
  },
  completion: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
})

export default mongoose.model<IProject>('Project', ProjectSchema)
