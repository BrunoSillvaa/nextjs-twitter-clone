import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'

import { LoginModal } from '@/components/Modals/LoginModal'
import { RegisterModal } from '@/components/Modals/RegisterModal'

export default function Home() {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Header label='Home'/>
      </Layout>
    </>
  )
}
