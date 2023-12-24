import classes from "./footerDetails.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
const FooterDetails = () => {
	const [data, setData] = useState([]);
	const [data2, setData2] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["contacts"],
		queryFn: async () => {
			const { data } = await axios.get(`https://api.bikeland.uz/v1/contacts`);
			setData2(data.items);
		},
	});
	const { isLoading } = useQuery({
		queryKey: ["payments"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/payment-methods`
			);
			setData(data.items);
		},
	});

	return (
		<div className={classes.FooterDetails}>
			<div className={classes.contacts}>
				<p>Контакты для связи:</p>
				<ul>
					{data2.map((el, index) => (
						<li key={index}>
							<LazyLoadImage src={el.photo_url} className='icon' />
							<a href={el.data}>{el.data}</a>
						</li>
					))}
				</ul>
			</div>
			<div className={classes.payment}>
				<p className={classes.payment_title}>
					<span>Принимаем оплату:</span>Наличными, через банковский перевод или
					через платежные системы
				</p>
				<div className={classes.images}>
					{data.length
						? data.map((el, index) => (
								<LazyLoadImage
									src={el.photo_url}
									key={index}
									width={100}
									height={100}
									alt='payment'
									effect='blur'
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

export default FooterDetails;
