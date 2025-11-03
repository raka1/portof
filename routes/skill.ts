import Skill from '../models/skill'

export const getSkills = async (ctx: any) => {
  try {
    const skills = await Skill.find().sort({ _id: 1 })

    ctx.status = 200
    ctx.body = { skills }
  } catch (error) {
    console.error('Error fetching skills:', error)

    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
