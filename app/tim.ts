import fs from 'fs'
import path from 'path'
import TIM from 'tim-js-sdk'

const timConfig = fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf-8')

const { SDKAppId }: { SDKAppId: number } = JSON.parse(timConfig)

const options = {
    SDKAppId,
}

// @ts-ignore
// 创建 SDK 实例
const tim = TIM.create(options)

// 设置 SDK 日志输出级别
// 0 为普通级别，日志量较多，接入时建议使用
tim.setLogLevel(0)

export default tim
