import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./favoritePopup.module.css";
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
	minusNum,
	plusNum,
	setBasketStatus,
	setOtions,
} from "../../../store/slices/basketSlice";
import BasketForm from "./basketForm/BasketForm";
import { Checkbox, FormControlLabel } from "@mui/material";

const BasketPopup = () => {
	const value = useSelector((state) => state.basket.value);
	const status = useSelector((state) => state.basket.status);
	const dispatch = useDispatch();
	const [options, setOptions] = useState([]);
	const otp = useSelector((state) => state.basket.options);

	useEffect(() => {
		if (!value.length) {
			dispatch(setBasketStatus(false));
		}
	}, [value, dispatch]);
	useEffect(() => {
		const body = document.querySelector("body");
		if (status) {
			body.classList.add("hold");
		} else {
			body.classList.remove("hold");
		}
	}, [status]);

	const handlePlus = (el) => {
		dispatch(plusNum(el));
	};

	const handleMinus = (el) => {
		dispatch(minusNum(el));
	};

	const handleClose = () => {
		dispatch(setBasketStatus(false));
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
	return (
		<div
			className={
				status
					? `${classes.FavoritePopup} ${classes.active}`
					: `${classes.FavoritePopup}`
			}>
			<div
				className={
					status ? `${classes.inner} ${classes.active}` : `${classes.inner}`
				}>
				<p>ВАШ ЗАКАЗ</p>
				<div className={classes.close} onClick={handleClose}>
					<AiOutlineClose />
				</div>
				<div className={classes.list}>
					{value.length &&
						value.map((el) => (
							<div key={el.id} className={classes.card}>
								<div className={classes.top}>
									<LazyLoadImage
										src={el?.photos?.length ? el.photos[0]?.photo_url : ""}
										alt='card'
										effect='blur'
										loading='lazy'
									/>
									<p>
										<span className={classes.title}>{el?.title}</span>
									</p>
								</div>
								<div className={classes.options}>
									{el?.options?.length
										? el?.options?.map((el, index) => (
												<FormControlLabel
													key={index}
													label={`${el.name} - ${el.price} UZS`}
													control={
														<Checkbox
															checked={
																otp?.length
																	? otp?.some((item) => item.id == el.id)
																	: null
															}
															value={JSON.stringify(el)}
															onChange={handleChange}
														/>
													}
												/>
										  ))
										: null}
								</div>
								<div className={classes.bottom}>
									<div className={classes.info}>
										<p>Цена товара:</p>
										<p style={{ fontWeight: 600 }}>
											{(
												(el?.uzb_price +
													otp?.reduce(
														(acc, product) => acc + product.price,
														0
													)) *
												el.num
											).toLocaleString("ru")}{" "}
											UZS
										</p>
									</div>
									<div className={classes.counter}>
										<span
											className={classes.plus}
											onClick={() => handlePlus(el)}>
											<AiOutlinePlus />
										</span>
										<span className={classes.num}>{el?.num}</span>
										<span
											className={classes.minus}
											onClick={() => handleMinus(el)}>
											<AiOutlineMinus />
										</span>
									</div>
								</div>
							</div>
						))}
				</div>
				<BasketForm />
			</div>
		</div>
	);
};

export default BasketPopup;
