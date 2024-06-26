import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useUser = (userId: string) => {
  const url = userId ? `/api/users/${userId}` : null

  const { data, error, isLoading, mutate } = useSWR(
    url,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false
    }
  )

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useUser
