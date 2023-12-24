import Forminput from "../../../formComp/formContnet/formInput/Forminput";
import classes from "./basketForm.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removerItemIntoBasket,
	setBasketStatus,
} from "../../../../store/slices/basketSlice";
import axios from "axios";
import { changeThanksStatus } from "../../../../store/slices/thanksSlice";
import InputMask from "react-input-mask";

const BasketForm = () => {
	const [name, setName] = useState("");
	const [num, setNum] = useState("");
	const [city, setCity] = useState("");
	const [active, setActive] = useState(false);
	const [active2, setActive2] = useState(false);
	const [active3, setActive3] = useState(false);
	const value = useSelector((state) => state.basket.value);
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
			name: name,
			phone_number: num,
			region: city,
			known_from: "bikeland.uz",
			basket: value.map((el) => {
				return {
					product_id: el?.id,
					quantity: el?.num,
					option_ids: el?.optionsDef.map((el) => el.id),
				};
			}),
		};

		name ? setActive(false) : setActive(true);
		num ? setActive2(false) : setActive2(true);
		city ? setActive3(false) : setActive3(true);
		if (num && name && city) {
			await axios
				.post("https://api.bikeland.uz/v1/orders", data, {
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then((res) =>
					res.status === 200
						? dispatch(setBasketStatus(false)) &
						dispatch(changeThanksStatus(true))
						: setActive(true) & setActive2(true) & setActive3(true)
				);
		}
	};
	return (
		<div className={classes.form}>
			{active || active2 || active2 ? (
				<p className={classes.validation}>Заполните обязательные поля</p>
			) : null}
			<Forminput
				placeholder={"Введите имя"}
				fn={setName}
				value={name}
				active={active}
				title='Как к вам обращаться?'
			/>
			<span className={classes.ttt}>На какой номер вам перезвонить?</span>
			<InputMask
				type='text'
				mask='+\9\9\8\ 99 999 99 99'
				placeholder='+99890 999 99 99'
				value={num}
				className={`${classes.input} ${active2 && classes.fail}`}
				onChange={(e) => setNum(e.target.value)}
			/>

			<Forminput
				placeholder={"Ваш город или регион?"}
				title='Название города, региона'
				fn={setCity}
				value={city}
				active={active3}
			/>
			<span className={classes.btn} onClick={handleSubmit}>
				Заказать
			</span>
		</div>
	);
};

export default BasketForm;
