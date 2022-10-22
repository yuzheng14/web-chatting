import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'

const Home: NextPage = () => {
  const router = useRouter()
  const isReady = router.isReady
  const logged = useAppSelector(state => state.login.logged)

  useEffect(() => {
    if (!logged) {
      router.push('/login')
    }
  }, [logged])

  return (
    <>
      <Head>
        <title>Web Chat|网语</title>
      </Head>
    </>
  )
}

export default Home
