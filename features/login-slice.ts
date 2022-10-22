import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyBmob from "../app/bmob";

export type Login = {
    logged: boolean,
    status: 'idle' | 'loading' | 'success' | 'failed',
    error?: unknown,
}

type LoginUser = {
    username: string,
    password: string,
}

// 登录异步 Thunk 
export const loginThunk = createAsyncThunk<any, LoginUser>(
    'login/asyncLogin',
     async (loginUser: LoginUser) => {
        // @ts-ignore
        // 莫名奇妙的错误
        let res = await MyBmob.User.login(loginUser.username, loginUser.password)
        console.log(res)
        return res
    }
)

// 初始登录状态
const initialState: Login = {
    logged: false,
    status: 'idle',
}

// 登录 Slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // 开始登录
            .addCase(loginThunk.pending, (state, action) => {
                state.status = 'loading'
            })
            // 登录成功
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'success'
            })
            // 登录失败
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

const loginReducer = loginSlice.reducer

export default loginReducer