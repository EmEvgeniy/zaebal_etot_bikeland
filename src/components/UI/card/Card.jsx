import { useCallback, useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
	removeItemFromFavorite,
	setItemIntoFavorite,
} from "../../../store/slices/favoriteSlice";
import {
	setBasketStatus,
	setItemIntoBasket,
} from "../../../store/slices/basketSlice";
import {
	addCardItem,
	changeCardStatus,
} from "../../../store/slices/cardDetailsSlice";
import classes from "./card.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import logo from "../../../assets/logo.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
	const dispatch = useDispatch();
	const favoriteItems = useSelector(
		(state) => state.favorite.value,
		shallowEqual
	);
	const isItemInFavorite = favoriteItems.some((el) => el.id === data.id);
	const [active, setActive] = useState(isItemInFavorite);
	const [active2, setActive2] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		if (active) {
			dispatch(setItemIntoFavorite(data));
		} else {
			dispatch(removeItemFromFavorite(data));
		}
	}, [active, data, dispatch]);

	useEffect(() => {
		setActive(isItemInFavorite);
	}, [isItemInFavorite]);

	const handleHeartClick = useCallback(
		(event) => {
			event.stopPropagation();
			setActive(!active);
		},
		[active]
	);

	const handleDetailsClick = useCallback(() => {
		dispatch(changeCardStatus(true));
		dispatch(addCardItem(data));
	}, [data, dispatch]);

	const handleOrderClick = useCallback(
		(event) => {
			event.stopPropagation();
			dispatch(changeCardStatus(false));
			dispatch(setItemIntoBasket({ ...data, num: 1, optionsDef: [] }));
			dispatch(setBasketStatus(true));
		},
		[data, dispatch]
	);
	useEffect(() => {
		setImageLoaded(false);

		if (data?.photos?.length && data?.photos[0]?.photo_url) {
			const img = new Image();
			img.src = data.photos[0].photo_url;
			img.onload = () => {
				setImageLoaded(true); // Установите imageLoaded в true при успешной загрузке изображения
			};
			img.onerror = () => {
				setImageLoaded(false); // Установите imageLoaded в false в случае ошибки загрузки
			};
		} else {
			setImageLoaded(true); // Если нет URL изображения, считаем, что изображение уже загружено
		}
	}, [data]);

	return (
		<Link
			to={`/product/${data.title}`}
			className={classes.Card}
			onClick={handleDetailsClick}>
			<div className={classes.top}>
				{imageLoaded ? (
					<LazyLoadImage
						src={
							data?.photos?.length && data?.photos[0]?.photo_url
								? !active2
									? data.photos[0]?.photo_url
									: data.photos[1]?.photo_url
								: logo
						}
						alt='bike'
						effect='blur'
						width={"100%"}
						height={"100%"}
						loading='lazy'
						className={
							data?.photos?.length && data?.photos[0]?.photo_url
								? `${classes.img}`
								: `${classes.logo}`
						}
						onMouseOver={() =>
							data?.photos?.length > 1 ? setActive2(true) : setActive2(false)
						}
						onMouseLeave={() => setActive2(false)}
					/>
				) : (
					<Skeleton width={"100%"} height={"100%"} />
				)}
				{data.tag ? <div className={classes.tag}>{data.tag}</div> : null}
				<div
					className={`${classes.heart} ${active && classes.active}`}
					onClick={handleHeartClick}>
					{active ? <AiTwotoneHeart /> : <AiOutlineHeart />}
				</div>
			</div>
			<div className={classes.bottom}>
				<p className={classes.title}>{data.title}</p>
				<span className={classes.key}>{data?.key ? data?.key : null}</span>
				<span className={classes.text}>
					{data?.description ? data?.description?.slice(0, 90) : null}
				</span>
				<p className={classes.price}>
					{data?.uzb_price?.toLocaleString("ru")} UZS
				</p>
				<div className={classes.bottom_btns}>
					<div
						className={classes.see_details}
						onClick={(e) => {
							e.stopPropagation();
							handleDetailsClick();
						}}>
						Смотреть подробнее
					</div>
					<span
						onClick={(e) => {
							e.stopPropagation();
							handleOrderClick(e);
						}}
						className={classes.main_btn}>
						Заказать
					</span>
				</div>
			</div>
		</Link>
	);
};

export default Card;
