import Skill from '../models/skill'

export const getSkills = async (ctx: any) => {
  try {
    const skills = await Skill.find()

    ctx.status = 200
    ctx.body = { skills }
  } catch (error) {
    console.error('Error fetching projects:', error)

    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
