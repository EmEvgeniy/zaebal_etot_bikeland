import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FormApi = createApi({
	reducerPath: "FormApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.bikeland.uz/v1/" }),
	endpoints: (build) => ({
		getPostForm: build.query({
			query: () => "feedbacks",
		}),
		postForm: build.mutation({
			query: (payload) => ({
				url: "forms/bc-widgets",
				method: "POST",
				body: payload,
			}),
		}),
		postForm3: build.mutation({
			query: (payload) => ({
				url: "forms/bc-forms",
				method: "POST",
				body: payload,
			}),
		}),
		postForm4: build.mutation({
			query: (payload) => ({
				url: "forms/wwu-forms",
				method: "POST",
				body: payload,
			}),
		}),
		postForm2: build.mutation({
			query: (payload) => ({
				url: "orders",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const {
	usePostFormMutation,
	usePostForm2Mutation,
	usePostForm3Mutation,
	usePostForm4Mutation,
} = FormApi;
