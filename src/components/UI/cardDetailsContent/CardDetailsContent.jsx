import { useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	setBasketStatus,
	setItemIntoBasket,
	setOtions,
} from "../../../store/slices/basketSlice";
import { changeCardStatus } from "../../../store/slices/cardDetailsSlice";
import {
	removeItemFromFavorite,
	setItemIntoFavorite,
} from "../../../store/slices/favoriteSlice";
import classes from "./cardDetailsContent.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";

const CardDetailsContent = ({ data }) => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorite.value);
	const [options, setOptions] = useState([]);
	const otp = useSelector((state) => state.basket.options);

	useEffect(() => {
		const isFavorite = favorites.some((el) => el.id === data.id);
		setActive(isFavorite);
	}, [favorites, data]);

	const handleFavoriteClick = () => {
		setActive(!active);

		if (!active) {
			dispatch(setItemIntoFavorite(data));
		} else {
			dispatch(removeItemFromFavorite(data));
		}
	};
	const handleChange = (e) => {
		const selectedValue = e.target.value;
		const isChecked = e.target.checked;

		let updatedOptions = [...options];

		if (isChecked) {
			updatedOptions.push(selectedValue);
		} else {
			updatedOptions = updatedOptions.filter(
				(value) => value !== selectedValue
			);
		}

		setOptions(updatedOptions);
		dispatch(setOtions(updatedOptions));
	};
	const handleOrderClick = () => {
		dispatch(setItemIntoBasket({ ...data, num: 1, optionsDef: otp }));
		dispatch(setBasketStatus(true));
		dispatch(changeCardStatus(false));
	};

	return (
		<div className={classes.CardDetailsContent}>
			<p className={classes.title}>{data.title}</p>
			<span className={classes.name}>Bikeland.uz</span>
			<p className={classes.price}>
				{data.uzb_price ? data.uzb_price.toLocaleString("ru") : data.uzb_price}{" "}
				UZS
			</p>
			<div className={classes.btns}>
				<span className={classes.btn} onClick={handleOrderClick}>
					Заказать
				</span>
				<span
					className={`${classes.icon} ${active ? classes.acitve : ""}`}
					onClick={handleFavoriteClick}>
					{active ? <AiTwotoneHeart /> : <AiOutlineHeart />}
				</span>
			</div>
			<div className={classes.conf}>
				<p>{data.description}</p>
				<div className={classes.check}>
					{data?.options?.map((el, index) => (
						<FormControlLabel
							key={index}
							label={`${el.name} - ${el.price} UZS`}
							control={
								<Checkbox
									checked={otp?.some((item) => item.id == el.id)}
									value={JSON.stringify(el)}
									onChange={handleChange}
								/>
							}
						/>
					))}
				</div>
				{data.video_link && (
					<p style={{ margin: "10px 0 20px 0" }}>
						<span>Видео обзор:</span>
						<a href={data.video_link} rel='noreferrer' target='_blank'>
							{data.video_link}
						</a>
					</p>
				)}
				{data.key && (
					<p>
						<span>Артикул:</span>
						{data.key}
					</p>
				)}
				{data.clearance && (
					<p>
						<span>Клиренс:</span>
						{data.clearance}
					</p>
				)}
				{data.fuel_tank_volume && (
					<p>
						<span>Объём топливного бака:</span>
						{data.fuel_tank_volume}
					</p>
				)}
				{data.fuel_consumption && (
					<p>
						<span>Расход топлива:</span>
						{data.fuel_consumption}
					</p>
				)}
				{data.engine && (
					<p>
						<span>Двигатель:</span>
						{data.engine}
					</p>
				)}
				{data.max_power && (
					<p>
						<span>Максимальная мощность:</span>
						{data.max_power}
					</p>
				)}
				{data.max_speed && (
					<p>
						<span>Максимальная скорость:</span>
						{data.max_speed}
					</p>
				)}
				{data.ignition_system && (
					<p>
						<span>Система зажигания:</span>
						{data.ignition_system}
					</p>
				)}
				{data.gearbox && (
					<p>
						<span>Коробка передач:</span>
						{data.gearbox}
					</p>
				)}
				{data.main_gear && (
					<p>
						<span>Главная передача:</span>
						{data.main_gear}
					</p>
				)}
				{data.front_brake && (
					<p>
						<span>Тормоз передний:</span>
						{data.front_brake}
					</p>
				)}
				{data.back_brake && (
					<p>
						<span>Тормоз задний:</span>
						{data.back_brake}
					</p>
				)}
				{data.front_tires && (
					<p>
						<span>Шины передние:</span>
						{data.front_tires}
					</p>
				)}
				{data.back_tires && (
					<p>
						<span>Шины задние:</span>
						{data.back_tires}
					</p>
				)}
				{data.sizes && (
					<p>
						<span>ДxШxВ:</span>
						{data.sizes}
					</p>
				)}
			</div>
		</div>
	);
};

export default CardDetailsContent;
