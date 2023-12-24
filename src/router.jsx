import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CardDetailPopup from "./components/UI/cardDetailPopup/CardDetailPopup";
const DealersPage = lazy(() => import("./pages/DealersPage/DealersPage"));
const DeliveryPage = lazy(() => import("./pages/DeliveryPage/DeliveryPage"));
const ForEmployees = lazy(() => import("./pages/forEmployees/ForEmployees"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/categories/:title",
				element: <CategoryPage />,
			},
			{
				path: "/dealers",
				element: <DealersPage />,
			},
			{
				path: "/delivery",
				element: <DeliveryPage />,
			},
			{
				path: "/forEmployees",
				element: <ForEmployees />,
			},
			{
				path: "/blog",
				element: <BlogPage />,
			},
			{
				path: `/product/:title`,
				element: <CardDetailPopup />,
			},
		],
	},
]);
