import mongoose, { Schema, Document } from 'mongoose'

interface ISkill extends Document {
  icon?: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Proficient' | 'Expert'
  category: 'Technical Skill' | 'Tool & Technology' | 'Other Development' | 'Legacy Tool'
}

const SkillSchema: Schema<ISkill> = new Schema({
  icon: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  level: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
})

export default mongoose.model<ISkill>('Skill', SkillSchema)
