import { useParams } from "react-router-dom";
import classes from "./categoryPage.module.css";
import CategoryReasons from "./categoryReasons/CategoryReasons";
import FormComp from "../../components/formComp/FormComp";
import CategoryCatalog from "./categoryCatalog/CategoryCatalog";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const CategoryPage = () => {
	const { title } = useParams();
	const [products, setProducts] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["category"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/products?status_id=4&with_pagination=false&page=1&size=50`
			);
			setProducts(data);
		},
	});

	return (
		<>
			{isSuccess && (
				<div className={classes.CategoryPage}>
					<CategoryCatalog
						pathName={title}
						isSuccess={isSuccess}
						products={products.filter(
							(el) => el.status?.id !== 2 && el.status?.id !== 1
						)}
					/>
					<CategoryReasons />
					<FormComp />
				</div>
			)}
		</>
	);
};

export default CategoryPage;
