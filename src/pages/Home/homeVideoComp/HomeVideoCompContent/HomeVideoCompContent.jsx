import classes from "./homeVideoCompContent.module.css";
import ReactIframe from "react-iframe";
import { motion } from "framer-motion";
const video = [
	"https://www.youtube.com/embed/3JwdTJz3JEc?si=3JwdTJz3JEc",
	"https://www.youtube.com/embed/QwAn7_aPo4U?si=QwAn7_aPo4U",
	"https://www.youtube.com/embed/yXFltkore7Y?si=yXFltkore7Y",
];
const HomeVideoCompContent = () => {
	return (
		<div className={classes.inner}>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className={classes.inner_item1}>
				<ReactIframe
					url={video[0]}
					width='100%'
					height='300'
					title='Tashkent'
					loading='lazy'
					frameBorder={0}
					styles={{ borderRadius: "15px" }}
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className={classes.inner_item2}>
				<ReactIframe
					url={video[1]}
					width='100%'
					height='100%'
					title='Tashkent'
					styles={{ borderRadius: "15px" }}
					loading='lazy'
					frameBorder={0}
				/>

				<ReactIframe
					url={video[2]}
					width='100%'
					height='100%'
					title='Tashkent'
					loading='lazy'
					frameBorder={0}
					styles={{ borderRadius: "15px" }}
				/>

				<motion.a
					href='https://www.youtube.com/@BikelandUz'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.2 }}>
					Смотреть больше
				</motion.a>
			</motion.div>
		</div>
	);
};

export default HomeVideoCompContent;
