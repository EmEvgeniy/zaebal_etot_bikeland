import classes from "./cardInfo.module.css";
import ReactIframe from "react-iframe";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function CityInfo() {
	const [data, setData] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["location"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/show-rooms?page=1&size=50`
			);
			setData(data.items);
		},
	});

	return (
		<div className={classes.CityInfo}>
			{data?.map((city, index) => (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: `0.${index}`, duration: 0.2 }}
					className={classes.inner_item}
					key={index}>
					<p>
						<span className={classes.city}>{city.city}</span>
						Адрес: {city.address}
					</p>
					<span>Ориентир:</span>
					<p>{city.landmark}</p>
					<p>
						<span>Телефон:</span>
						{city.phone_number}
					</p>
					<ReactIframe
						url={city.location_url}
						width='100%'
						height='300'
						title='Tashkent'
						loading='lazy'
						frameBorder={0}
						styles={{ borderRadius: "15px" }}
					/>
				</motion.div>
			))}
		</div>
	);
}
