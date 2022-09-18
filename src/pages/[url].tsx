import type { NextPage } from 'next';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUrl from '@/hooks/useUrl'

const UrlPage: NextPage = () => {
  const router = useRouter()
  const { url } = router.query
  const { getUrl } = useUrl()

  useEffect(() => {
    if (router.isReady) {
      getUrl(url as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  return null
}

export default UrlPage