import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import classes from "./logo.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../../assets/logo.svg";
import { useQuery } from "react-query";

const Logo = () => {
	const status = useSelector((state) => state.search.value);
	const logoClassName = status
		? `${classes.Logo} ${classes.active}`
		: classes.Logo;
	const [data, setData] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["logo"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/logos?page=1&size=50`
			);
			setData(data.items);
		},
	});

	return (
		<Link to={"/"} className={logoClassName}>
			<LazyLoadImage
				src={data[0]?.photo_url}
				effect='blur'
				alt='logo'
				loading='lazy'
				className={classes.logo_img2}
			/>
			<LazyLoadImage
				src={logo}
				effect='blur'
				alt='logo'
				loading='lazy'
				className={classes.logo_img}
			/>
		</Link>
	);
};

export default Logo;
