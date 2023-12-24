import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SearchIcon from "../searchInput/icon/SearchIcon";
import classes from "./searchComp2.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchStatus } from "../../../store/slices/searchStatus";
import {
	addCardItem,
	changeCardStatus,
} from "../../../store/slices/cardDetailsSlice";
import axios from "axios";

const SearchComp2 = () => {
	const [searchItem, setSearch] = useState("");
	const [list, setList] = useState([]);
	const searchStatus = useSelector((state) => state.search.value);
	const dispatch = useDispatch();
	const rootRef = useRef(null);
	const getListData = async () => {
		try {
			const response = await axios.get(
				`https://api.bikeland.uz/v1/products?with_pagination=false&page=1&size=50`
			);
			setList(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		getListData();
	}, []);

	const handleRootClick = () => {
		dispatch(changeSearchStatus(true));
	};

	const handleClickOutside = (e) => {
		if (rootRef.current && !rootRef.current.contains(e.target)) {
			dispatch(changeSearchStatus(false));
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className={classes.SearchComp}>
			<div
				className={classes.SearchComp_input}
				onClick={handleRootClick}
				ref={rootRef}>
				<SearchIcon className='icon' />
				<motion.input
					initial={{ opacity: 0, width: "1px", padding: "0" }}
					animate={
						searchStatus
							? { opacity: 1, width: "170px", zIndex: 2, padding: "0 5px" }
							: { opacity: 0, width: "1px", padding: "0" }
					}
					transition={{ duration: 0.2 }}
					type='text'
					placeholder='Искать на сайте'
					value={searchItem}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div
					className={
						searchItem && searchStatus
							? `${classes.list} ${classes.active}`
							: `${classes.list}`
					}>
					{list?.filter(
						(el) => el.title.includes(searchItem) || el.key.includes(searchItem)
					).length ? (
						list
							?.filter(
								(el) =>
									el.title.includes(searchItem) || el.key.includes(searchItem)
							)
							?.map((el, index) => (
								<p
									key={index}
									onClick={() =>
										dispatch(addCardItem(el)) &
										dispatch(changeCardStatus(true)) &
										searchItem("")
									}>
									{el.title}
								</p>
							))
					) : (
						<p>Ничего не найдено</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchComp2;
