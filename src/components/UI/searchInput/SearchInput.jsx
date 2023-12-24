import { useEffect, useState } from "react";
import SearchIcon from "./icon/SearchIcon";
import { useDispatch } from "react-redux";
import {
	addCardItem,
	changeCardStatus,
} from "../../../store/slices/cardDetailsSlice";
import axios from "axios";
import classes from "./searchItem.module.css";

const SearchInput = () => {
	const [list, setList] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const dispatch = useDispatch();

	const getListData2 = async () => {
		try {
			const response = await axios.get(
				`https://api.bikeland.uz/v1/products?with_pagination=false&page=1&size=50`
			);
			setList(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleItemClick = (el) => {
		dispatch(addCardItem(el));
		dispatch(changeCardStatus(true));
	};

	useEffect(() => {
		getListData2();
	}, []);

	return (
		<div className={classes.SearchInput}>
			<div className={classes.SearchInput_wrapper}>
				<SearchIcon className='icon' />
				<input
					type='text'
					placeholder='Искать на сайте'
					value={searchItem}
					onChange={(e) => setSearchItem(e.target.value)}
				/>
			</div>
			<div
				className={
					searchItem ? `${classes.list} ${classes.active}` : `${classes.list}`
				}>
				{list?.filter(
							(el) =>
								el.title.includes(searchItem) || el.key.includes(searchItem)
						)?.length ? (
					list
						?.filter(
							(el) =>
								el.title.includes(searchItem) || el.key.includes(searchItem)
						)
						.map((el, index) => (
							<p
								key={index}
								onClick={() => handleItemClick(el) & setSearchItem("")}>
								{el.title}
							</p>
						))
				) : (
					<p>Ничего не найдено</p>
				)}
			</div>
		</div>
	);
};

export default SearchInput;
