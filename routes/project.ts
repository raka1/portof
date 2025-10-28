import Project from '../models/project'

export const getProjects = async (ctx: any) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean()

    ctx.status = 200
    ctx.body = { projects }
  } catch (error) {
    console.error('Error fetching projects:', error)

    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
