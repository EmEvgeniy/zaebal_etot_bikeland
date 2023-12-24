import { Suspense, useState } from "react";
import Card from "../../../components/UI/card/Card";
import classes from "./catalogContent.module.css";
import Container from "../../../components/container/Container";
import axios from "axios";
import { useQuery } from "react-query";

const CatalogContent = () => {
	const [data, setData] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/products?by_popularity=true&show_on_main_page=true&with_pagination=false&page=1&size=50`
			);
			setData(data);
		},
	});
	return (
		<section className={classes.CatalogContent}>
			{isSuccess && data?.length > 0 && (
				<Container>
					<div className={classes.inner}>
						<Suspense fallback={<div>Loading...</div>}>
							{data
								?.filter((el) => el.category?.id !== 9)
								.sort((a, b) => b.tags?.length - a.tags?.length)
								.map((el, index) => (
									<Card data={el} key={index} index={index} />
								))}
						</Suspense>
					</div>
				</Container>
			)}
		</section>
	);
};

export default CatalogContent;
