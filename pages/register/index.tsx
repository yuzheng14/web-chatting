import { Button, Form, Input, message } from "antd"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { AV } from "../../app/leancloud"
import { LoginUser } from "../../features/login-slice"
import style from '../../styles/register.module.scss'

// status 枚举类型
type Status = 'idle' | 'success' | 'failed'

const Register: React.FC<{}> = () => {

    const [status, setStatus] = useState('idle') as [Status, Dispatch<SetStateAction<Status>>]
    const [error, setError] = useState('')
    const router = useRouter()

    // status 状态发生变化后即检测当前当前登录是否成功 or 失败，输出对应消息
    useEffect(() => {
        if (status === 'success') {
            message.success('注册成功，即将跳转到登录页面')
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        }
        if (status === 'failed') {
            message.error(`${error}`)
            // 失败后设为 idle 状态
            setStatus('idle')
        }
    }, [status])

    // 点击注册后，调用 api 进行注册
    const onFinish = async ({ username, password }: LoginUser) => {
        const user = new AV.User()
        user.setUsername(username)
        user.setPassword(password)
        try {
            // TODO 取消 let
            await user.signUp()
            setStatus('success')
            console.log(`注册成功，user:id:${user.id}`);
        } catch (error) {
            setStatus('failed')
            let message = (error as Error).message
            if (message.indexOf('Username has already been taken') !== -1) {
                setError('当前用户名已被使用，请换个重试')
            } else {
                setError((error as Error).message)
            }
        }
    }

    // Form.Item 的 grid 布局样式
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }
    }
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <>
            <div className={style.container}>
                <Form
                    className={style.registerForm}
                    {...formItemLayout}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{
                            required: true,
                            message: '请输入用户名'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{
                            required: true,
                            message: '请输入密码'
                        }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('两次密码不相同'))
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Register