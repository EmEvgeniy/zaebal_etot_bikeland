import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: "Экипировки",
	id: 1,
};
export const titleSlice = createSlice({
	name: "titleSlice",
	initialState,
	reducers: {
		changeTitle: (state, action) => {
			state.value = action.payload;
		},
		setTitleId:(state,action) => {
			state.id = action.payload
		}
	},
});

export const { changeTitle,setTitleId } = titleSlice.actions;
export default titleSlice.reducer;
