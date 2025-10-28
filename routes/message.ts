import Message from '../models/message'

export const sendMessage = async (ctx: any) => {
  const { name, email, message } = ctx.request.body as {
    name: string
    email: string
    message: string
  }

  try {
    const newMessage = new Message({ name, email, message, timestamp: new Date().toISOString() })
    await newMessage.save()

    ctx.status = 201
    ctx.body = { message: 'Message sent successfully' }
  } catch (error) {
    console.log('Error saving message:', error)

    ctx.status = 500
    ctx.body = { error: 'Internal Server Error' }
  }
}
