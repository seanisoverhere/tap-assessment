import type { NextPage } from 'next';
import React from 'react'
import { useRouter } from 'next/router'

const UrlPage: NextPage = () => {
  const router = useRouter()
  const { url } = router.query

  return (
    <div>{url}</div>
  )
}

export default UrlPage