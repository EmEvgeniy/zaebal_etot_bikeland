import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: [],
	options: [],
	status: false,
};

export const basketSlice = createSlice({
	name: "basketSlice",
	initialState,
	reducers: {
		setItemIntoBasket: (state, action) => {
			if (
				Array.isArray(state.value) &&
				!state.value.some((el) => el.id === action.payload.id)
			) {
				state.value.push(action.payload);
			}
		},
		setOtions: (state, action) => {
			state.options = action.payload.map((el) => JSON.parse(el));
		},
		removerItemIntoBasket: (state, action) => {
			state.value = state.value.filter((el) => el.id !== action.payload.id);
		},
		setBasketStatus: (state, action) => {
			state.status = action.payload;
		},
		plusNum: (state, action) => {
			let i = state.value.findIndex((el) => el.id === action.payload.id);
			state.value[i].num = state.value[i].num + 1;
		},
		minusNum: (state, action) => {
			let i = state.value.findIndex((el) => el.id === action.payload.id);
			if (state.value[i].num === 1) {
				state.value = state.value.filter((el) => el.id !== action.payload.id);
			} else {
				state.value[i].num = state.value[i].num - 1;
			}
		},
	},
});

export const {
	setItemIntoBasket,
	removerItemIntoBasket,
	setBasketStatus,
	plusNum,
	setOtions,
	minusNum,
} = basketSlice.actions;
export default basketSlice.reducer;
