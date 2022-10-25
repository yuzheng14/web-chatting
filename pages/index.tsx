import { message } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'

const Home: NextPage = () => {
  const router = useRouter()
  const logged = useAppSelector(state => state.login.logged)

  useEffect(() => {
    if (!logged) {
      message.error('您当前尚未登录，即将跳转到登录页面')
      setTimeout(() => { router.push('/login') }, 1000)
    } else {
      router.push('/conversation')
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
