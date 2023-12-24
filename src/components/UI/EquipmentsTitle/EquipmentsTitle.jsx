import classes from "./equipmentsTitle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeTitle, setTitleId } from "../../../store/slices/titleSlice";
import Container from "../../container/Container";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function EquipmentsTitle() {
	const value = useSelector((state) => state.title.id);
	const value2 = useSelector((state) => state.category.value);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["sub_category"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/categories?page=1&size=50`
			);
			setData(data?.items?.filter((el) => el.id == 9)[0]?.sub_categories);
		},
	});
	
	return (
		<>
			{value2 === 9 && isSuccess ? (
				<div className={classes.EquipmentsTitle}>
					<Container>
						<div className={classes.inner_cat}>
							{data?.map((el, index) => (
								<span
									className={
										value === el.id
											? `${classes.btn} ${classes.active}`
											: `${classes.btn}`
									}
									key={index}
									onClick={() =>
										dispatch(changeTitle(el.name)) & dispatch(setTitleId(el.id))
									}>
									{el.name}
								</span>
							))}
						</div>
					</Container>
				</div>
			) : null}
		</>
	);
}
