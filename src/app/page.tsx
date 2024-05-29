import { Header } from '@/components/Header'
import { Form } from '@/components/Form'
import { PostsFeed } from '@/components/Posts/PostsFeed'

export default function Home() {

  return (
    <>
      <Header label='Home' />
      <Form placeholder='Whats happening?'/>
      <PostsFeed />
    </>
  )
}
