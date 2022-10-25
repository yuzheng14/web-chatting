import { CommentOutlined, TeamOutlined } from "@ant-design/icons"
import { Avatar, Input, Menu, MenuProps, Segmented } from "antd"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"

import styles from '../styles/aside.module.scss'

type AsideProps = {
    choice: 'friend' | 'conversation',
    children: ReactNode,
}

type MenuItem = Required<MenuProps>['items'][number]

function getMenuItem(
    label: ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

const Aside: React.FC<AsideProps> = ({ choice, children }) => {
    const router = useRouter()

    const onSearch = (values: string) => {
        console.log(values);
    }

    const friendPanel = (
        <div>
            <Input.Search
                placeholder="搜索用户"
                onSearch={onSearch}
                allowClear
                enterButton="搜索"
                size="large"
            />
            <div>

            </div>
        </div>
    )

    const conversationPanel = (
        <div>

        </div>
    )

    const onChange = (value: string | number) => {
        console.log(value);

        if (value === 'conversation') {
            router.push('/conversation', undefined, { shallow: true })
        } else {
            router.push('/friend', undefined, { shallow: true })
        }
    }

    const contentPanel = choice === 'friend' ? friendPanel : conversationPanel

    const items: MenuProps['items'] = [
        getMenuItem('会话', 'conversation', <CommentOutlined />),
        getMenuItem('好友', 'friend', <TeamOutlined />)
    ]

    const onClick: MenuProps['onClick'] = ({key}) => {
        if (key === 'conversation') {
            router.push('/conversation', undefined, { shallow: true })
        } else {
            router.push('/friend', undefined, { shallow: true })
        }
    }

    return (
        <aside>
            <div className={styles.choicePanel}>
                {/* <Segmented
                    // className={styles.segmentation}
                    options={[
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <div>会话</div>
                                </div>
                            ),
                            value: 'conversation'
                        }, {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <div>好友</div>
                                </div>
                            ),
                            value: 'friend'
                        }
                    ]}
                    onChange={onChange}
                    defaultValue={choice}
                /> */}
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={[choice]}
                    mode="inline"
                    items={items}
                    inlineCollapsed={true}
                />
            </div>

        </aside>
    )
}

export default Aside