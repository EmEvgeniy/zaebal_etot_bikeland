import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 1,
};

export const categoryId = createSlice({
	name: "categoryId",
	initialState,
	reducers: {
		getCategoryId: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { getCategoryId } = categoryId.actions;
export default categoryId.reducer;
