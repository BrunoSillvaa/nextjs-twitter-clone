import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false
  })

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useUsers
