import classes from "./socialMedia.module.css";
import tel from "../../../assets/telegram.svg";
import insta from "../../../assets/insta.svg";
import youtube from "../../../assets/youtube.svg";
import facebook from "../../../assets/facebook.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const list = [
	{ img: tel, link: "https://t.me/BikelandUz_bot" },
	{ img: insta, link: "https://www.instagram.com/bikeland.uz/" },
	{ img: facebook, link: "https://www.facebook.com/bikeland.uz/" },
	{ img: youtube, link: "https://www.youtube.com/@BikelandUz" },
];

const SocialMedia = () => {
	return (
		<div className={classes.SocialMedia}>
			{list.map((el, index) => (
				<a href={el.link} key={index}>
					<LazyLoadImage
						src={el.img}
						alt='social'
						effect='blur'
						loading='lazy'
					/>
				</a>
			))}
		</div>
	);
};
export default SocialMedia;
