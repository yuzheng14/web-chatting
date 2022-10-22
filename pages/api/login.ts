import { NextApiRequest, NextApiResponse } from "next";
import tim from "../../app/tim";

/**
 * 登录 api 
 * @param req api 请求头
 * @param resp qpi 响应
 */
export default async function loginHandler(req: NextApiRequest, resp: NextApiResponse) {
    const { userId, passwd } = req.body()
    try {
        // 调用 sdk 的登录
        const loginPromise = await tim.login({ userID: userId, userSig: passwd })
        console.log(loginPromise.data);
        // 登录成功则状态码设定为 200
        resp.status(200)
        // 根据是否重复登录来判断返回信息
        if (loginPromise.data.repeatLogin === true) {
            console.log(loginPromise.data.errorInfo)
            resp.json({ isLogged: false, message: loginPromise.data.errorInfo })
        } else {
            resp.json({ isLogged: true, message: null })
        }
    } catch (err) {
        // 发生错误则返回 500
        console.log(err)
        resp.status(500)
        resp.json({ isLogged: false, message: err })
    }
}