import { Suspense, useState } from "react";
import Card from "../../../components/UI/card/Card";
import classes from "./catalogContent.module.css";
import Container from "../../../components/container/Container";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import FilterComp from "../../../components/UI/filterComp/FilterComp";

const CatalogContent = () => {
	const [data, setData] = useState([]);
	const value2 = useSelector((state) => state.filter.value);
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
					<div className={classes.wrap}>
						<FilterComp />
						<div className={classes.inner}>
							<Suspense fallback={<div>Loading...</div>}>
								{value2 === "По Цене(убыв)"
									? data
											?.filter((el) => el.category?.id !== 9)
											.sort((a, b) => b.id - a.id)
											.sort((a, b) => b.uzb_price - a.uzb_price)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))
									: value2 === "По Цене(возр)"
									? data
											?.filter((el) => el.category?.id !== 9)
											.sort((a, b) => b.id - a.id)
											.sort((a, b) => a.uzb_price - b.uzb_price)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))
									: value2 === "Популярные"
									? data
											?.filter((el) => el.category?.id !== 9)
											.sort((a, b) => b.id - a.id)
											.sort((a, b) => b.quantity - a.quantity)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))
									: data
											?.filter((el) => el.category?.id !== 9)
											.sort((a, b) => b.id - a.id)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))}
							</Suspense>
						</div>
					</div>
				</Container>
			)}
		</section>
	);
};

export default CatalogContent;
