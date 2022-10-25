import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../../styles/login-success.module.scss'

const LoginSuccess = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 1000)
    })

    return (
        <>
            <div className={styles.center}>
                <p className={styles.lg}>🚀</p>
                <p className={styles.bold}>登录成功</p>
            </div>
        </>
    )
}

export default LoginSuccess
