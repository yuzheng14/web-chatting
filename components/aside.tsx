import { Input } from "antd"

type AsideProps = {
    currentFriend: string,
}

const Aside: React.FC<AsideProps> = ({ currentFriend }) => {

    const onSearch = (values: string) => {
        console.log(values);
    }

    return (
        <aside>
            <Input.Search
                placeholder="搜索用户"
                onSearch={onSearch}
                allowClear
                enterButton="搜索"
                size="large"
            />
            <div>
                
            </div>
        </aside>
    )
}

export default Aside