import { Button, Checkbox, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'
import loginStyle from '../styles/login.module.scss'
import { useAppDispatch } from '../app/hooks'
import { loginThunk } from '../features/login-slice'

const Login: React.FC<{}> = () => {
    const dispatch = useAppDispatch()

    const onFinish = async ({ username, password }: { username: string, password: string }) => {
        dispatch(loginThunk({ username, password }))
    }
    const onFinishFailed = () => {

    }

    return (
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
    )
}

export default Login