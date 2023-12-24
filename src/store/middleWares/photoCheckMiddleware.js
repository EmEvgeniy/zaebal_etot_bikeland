// photoCheckMiddleware.js
import { createSlice } from "@reduxjs/toolkit";
import { useGetProductsQuery } from "./productsApi"; // Импортируйте ваш запрос

const initialState = {
	hasPhotos: false,
};

const photoCheckSlice = createSlice({
	name: "photoCheck",
	initialState,
	reducers: {
		setHasPhotos: (state, action) => {
			state.hasPhotos = action.payload;
		},
	},
});

export const { setHasPhotos } = photoCheckSlice.actions;

export default photoCheckSlice.reducer;

// Middleware для проверки фотографий
export const photoCheckMiddleware = (store) => (next) => (action) => {
	if (action.type === useGetProductsQuery.fulfilled.type) {
		// Получите данные из запроса
		const data = action.payload;

		// Проверьте, есть ли фотографии в данных
		const hasPhotos = data.some(
			(item) => item.photos.length > 0 && item.category_id !== 9
		);

		// Диспетчер Redux-действия для установки hasPhotos
		store.dispatch(setHasPhotos(hasPhotos));
	}

	return next(action);
};
