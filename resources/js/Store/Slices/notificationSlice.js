import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: [],
    loading: false
}

export const updateAsync = createAsyncThunk(
    'notification/getUnread',
    async(userId)=> {
        let res = await axios.post('/notification/'+userId+'/get-unread')
        return res.data.notifications
    }
)

export const notificationSlice = createSlice({
    name : 'notification',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            });
    },
})

//export const {updateAsync} =

export const selectNotification = (state) => state.notification.value

export default notificationSlice.reducer


