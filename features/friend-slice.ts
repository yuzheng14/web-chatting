import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";

interface Friend {
    id: string,
    avatar: string,
    // lastMessage: {
    //     content: string,
    //     date: string,
    // },
}

type FriendEntity = EntityState<Friend> & {
    status: 'idle' | 'pending' | 'success' | 'failed'
    error?: string
}

const friendAdapter = createEntityAdapter<Friend>({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = friendAdapter.getInitialState({
    status: 'idle' as 'idle' | 'pending' | 'success' | 'failed',
    error: null as string | null,
})

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {}
})

const friendReducer = friendSlice.reducer

export default friendReducer