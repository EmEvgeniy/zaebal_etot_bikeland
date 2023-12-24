import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.bikeland.uz/v1/" }),
	endpoints: (build) => ({
		getProducts: build.query({
			query: () =>
				`products?show_on_see_also=true&with_pagination=false&page=1&size=50`,
		}),
		getProductsByCategories: build.query({
			query: (id) => `products?category_id=${id}&with_pagination=false&page=1&size=50&status_id=4`,
		}),
	}),
});

export const { useGetProductsQuery, useGetProductsByCategoriesQuery } =
	productsApi;
