import {  useState } from "react";
import classes from "./deliveryPage.module.css";
import CategoryReasons from "../CategoryPage/categoryReasons/CategoryReasons";
import FormComp from "../../components/formComp/FormComp";
import { motion } from "framer-motion";
import Container from "../../components/container/Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import axios from "axios";
const DeliveryPage = () => {
	const [list, setList] = useState([]);
	const [list2, setList2] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["diliv"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/delivery/?page=1&size=50`
			);
			setList(data.items);
		},
	});
	const { isLoading } = useQuery({
		queryKey: ["diliv_media"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/delivery/media?no_pagination=true&page=1&size=50`
			);
			setList2(data);
		},
	});
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ delay: 0.7, duration: 1 }}
			className={classes.DiliveryPage}>
			<h1 className={classes.title}>{list[0]?.title}</h1>
			<p className={classes.subTitle}>{list[0]?.description}</p>
			{list2?.length ? (
				<div className={classes.photos}>
					<Container>
						<div className={classes.inner}>
							{list2?.map((el, index) => (
								<LazyLoadImage
									src={el.photo_url}
									key={index}
									width={300}
									height={300}
								/>
							))}
						</div>
					</Container>
				</div>
			) : null}
			<CategoryReasons />
			<FormComp />
		</motion.div>
	);
};

export default DeliveryPage;
