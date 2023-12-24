import { useEffect, useState } from "react";
import FacebookIcon from "./icons/Facebook_icon";
import InstagramIcon from "./icons/Instagram_icon";
import TelegramIcon from "./icons/Telegran_icon";
import YoutubeIcon from "./icons/Youtube_icon";
import classes from "./socialLinks.module.css";
import axios from "axios";
import { useQuery } from "react-query";

const SocialLinks = () => {
	const [data, setData] = useState([]);
	const { isLoading } = useQuery({
		queryKey: ["socialLinks"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/social-media?page=1&size=50`
			);
			setData(data.items);
		},
	});

	return (
		<div className={classes.SocialLinks}>
			{data.map((item) => (
				<a
					key={item.link}
					href={item.link}
					className={classes.SocialLinks_item}>
					{item.type === "Facebook" ? (
						<FacebookIcon />
					) : item.type === "Instagram" ? (
						<InstagramIcon />
					) : item.type == "Youtube" ? (
						<YoutubeIcon />
					) : (
						<TelegramIcon />
					)}
				</a>
			))}
		</div>
	);
};

export default SocialLinks;
