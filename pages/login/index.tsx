import { Button, Checkbox, Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'
import loginStyle from '../../styles/login.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginThunk, selectLoginError, selectLoginLogged, selectLoginStatus } from '../../features/login-slice'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Login: React.FC<{}> = () => {
    const dispatch = useAppDispatch()
    const logged = useAppSelector(selectLoginLogged)
    const router = useRouter()
    const status = useAppSelector(selectLoginStatus)
    const error = useAppSelector(selectLoginError)

    // 如果登录上，则跳转到下一页
    useEffect(() => {
        if (logged) {
            setTimeout(() => {
                router.push('/login/login-success')
            }, 1000)
        }
    }, [logged])

    // 如果登录失败，则显示失败窗口
    useEffect(() => {
        if (status === 'failed') {
            console.log(error);
            if (error?.indexOf('mismatch')) {
                message.error('用户名或密码错误，请重试')
            } else {
                message.error(error)
            }
        }
    }, [status])

    const onFinish = async ({ username, password }: { username: string, password: string }) => {
        dispatch(loginThunk({ username, password }))
    }
    const onFinishFailed = () => {

    }


    if (logged) {
        message.success('登录成功')
    }

    return (
        <>

            <div className={loginStyle.container}>
                {/* 表单 */}
                <Form
                    name='login'
                    className={loginStyle.loginForm}
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                // autoComplete="off"
                >
                    {/* 用户名项 */}
                    <Form.Item
                        // label="username"
                        name="username"
                        rules={[{
                            required: true,
                            message: '请输入用户名',
                        }]}
                    >
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder="用户名" />
                    </Form.Item>
                    {/* 密码 */}
                    <Form.Item
                        // label="password"
                        name="password"
                        rules={[{
                            required: true,
                            message: '请输入你的密码'
                        }]}
                    >
                        <Input
                            prefix={<LockOutlined className='site-form-item-icon' />}
                            type="password"
                            placeholder='密码'
                        />
                    </Form.Item>
                    {/* 记住密码 */}
                    <Form.Item>
                        <Form.Item name={'remember'} valuePropName="checked" noStyle>
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>
                        <Link href="">
                            <a className={loginStyle.loginFormForgot}>
                                忘记密码
                            </a>
                        </Link>
                    </Form.Item>
                    {/* 登录和注册 */}
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className={loginStyle.loginFormButton}>
                            登录
                        </Button>
                        或者 <Link href="">现在注册</Link>
                    </Form.Item>
                </Form>
            </div >
        </>
    )
}

export default Login