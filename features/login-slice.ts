import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import realtime, { AV } from "../app/leancloud";
import { RootState } from "../app/store";

export type Login = {
    logged: boolean,
    status: 'idle' | 'loading' | 'success' | 'failed',
    error?: string,
    client: ReturnType<typeof realtime.createIMClient> | null
}

type LoginUser = {
    username: string,
    password: string,
}

// 登录异步 Thunk 
export const loginThunk = createAsyncThunk<any, LoginUser>(
    'login/asyncLogin',
    async (loginUser: LoginUser) => {
        let user = await AV.User.logIn(loginUser.username, loginUser.password)
        return realtime.createIMClient(user)
    }
)

// 初始登录状态
const initialState: Login = {
    logged: false,
    status: 'idle',
    client: null,
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
                state.logged = true
                state.status = 'success'
                state.client = action.payload
            })
            // 登录失败
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

const loginReducer = loginSlice.reducer

export const selectLoginLogged = (state: RootState) => state.login.logged
export const selectLoginStatus = (state: RootState) => state.login.status
export const selectLoginError = (state: RootState) => state.login.error

export default loginReducer