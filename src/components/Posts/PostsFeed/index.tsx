'use client'

import usePosts from '@/hooks/usePosts'

import { PostItem } from '../PostItem'

interface PostsFeedProps {
  userId?: string
}

export function PostsFeed({ userId }: PostsFeedProps) {
  const { data: posts = [] } = usePosts(userId)

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  )
}
