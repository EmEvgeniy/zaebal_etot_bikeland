import { useEffect, useState } from "react";
import Card from "../card/Card";
import classes from "./seeAlsoComp.module.css";
import { motion } from "framer-motion";
import axios from "axios";
import Container from "../../container/Container";
import { useQuery } from "react-query";

const SeeAlsoComp = () => {
	const [list, setList] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["see"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/products?status_id=4&show_on_see_also=true&with_pagination=false&page=1&size=50`
			);
			setList(data);
		},
	});

	return (
		<div style={{ width: "100%" }}>
			<Container>
				<motion.div
					initial={{ opacity: 0 }}
					animate={list?.length ? { opacity: 1 } : { opacity: 0 }}
					transition={{ delay: 0.3, duration: 0.3 }}
					className={classes.SeeAlsoComp}>
					<p className={classes.title}>Смотрите так же:</p>
					<div className={classes.inner}>
						{list.slice(0, 4).map((el, index) => (
							<Card key={index} data={el} />
						))}
					</div>
				</motion.div>
			</Container>
		</div>
	);
};

export default SeeAlsoComp;
