import classes from "./categoryCatalog.module.css";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../../../components/container/Container";
import Card from "../../../components/UI/card/Card";
import FilterComp from "../../../components/UI/filterComp/FilterComp";
import EquipmentsTitle from "../../../components/UI/EquipmentsTitle/EquipmentsTitle";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const categories = [
	{ title: "МОТОЦИКЛЫ", link: "bikes", id: 1 },
	{ title: "СКУТЕРЫ", link: "scooter", id: 2 },
	{ title: "МОПЕДЫ", link: "mopeds", id: 3 },
	{ title: "ЭЛЕКТРОСКУТЕРЫ", link: "electric_scooter", id: 4 },
	{ title: "ТРИЦИКЛЫ", link: "tricycles", id: 5 },
	{ title: "МИНИ БАЙКИ", link: "mini_bikes", id: 6 },
	{ title: "КВАДРОЦИКЛЫ", link: "atvs", id: 7 },
	{ title: "ДВИГАТЕЛИ", link: "engines", id: 8 },
	{
		title: "ЭКИП/АКСЕССУАРЫ/ЗАПЧАСТИ",
		link: "EQUIPMENT_ACCESSORIES_SPARE PARTS",
		id: 9,
	},
];

const CategoryCatalog = ({ pathName, isSuccess, products }) => {
	const [title, setTitle] = useState("");
	const value2 = useSelector((state) => state.filter.value);
	const value3 = useSelector((state) => state.title.id);
	const value = useSelector((state) => state.category.value);
	useLayoutEffect(() => {
		setTitle(
			categories.find((category) => category.link === pathName)?.title || ""
		);
	}, [pathName]);

	const displayedProducts = products
		.filter((el) =>
			pathName.includes("EQUIPMENT_ACCESSORIES_SPARE PARTS")
				? el.category?.id === value && el.sub_category?.id === value3
				: el.category?.id === value
		)
		.filter((el) => (value2 === "Новинки" && el.tag ? el.tag : el));

	return (
		<section className={classes.CategoryCatalog}>
			<Container>
				<div className={classes.inner}>
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ delay: 0.3, duration: 1 }}
						key={title}>
						{title}
					</motion.h1>
					<FilterComp />
					<EquipmentsTitle />
					{isSuccess ? (
						<div className={classes.content}>
							<div className={classes.content_inner}>
								{value2 === "По Цене(убыв)"
									? displayedProducts
											.sort((a, b) => b.uzb_price - a.uzb_price)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))
									: value2 === "По Цене(возр)"
									? displayedProducts
											.sort((a, b) => a.uzb_price - b.uzb_price)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))
									: value2 === "Популярные"
									? displayedProducts
											.sort((a, b) => b.quantity - a.quantity)
											.map((el, index) => (
												<Card data={el} key={index} index={index} />
											))
									: displayedProducts.map((el, index) => (
											<Card data={el} key={index} index={index} />
									  ))}
							</div>
						</div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key={value}
							transition={{ delay: 0.7, duration: 1 }}
							className={classes.added}>
							<p>
								К сожалению, товар не найден, возможно, он остался на складе,
								обратитесь в отдел продаж за подробной информацией.
							</p>
							<Link
								to='form'
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
								className={classes.btns_btn}>
								<span>Оставить запрос</span>
							</Link>
						</motion.div>
					)}
				</div>
			</Container>
		</section>
	);
};

export default CategoryCatalog;
