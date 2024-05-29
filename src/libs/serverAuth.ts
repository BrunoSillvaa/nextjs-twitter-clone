import prisma from '@/libs/prismadb'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

const serverAuth = async () => {
  const session = await getServerSession(authOptions)

  // console.log('Sessao: ' + JSON.stringify(session))

  if (!session?.user?.email) return null

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!currentUser) return null

  return currentUser
}

export default serverAuth
