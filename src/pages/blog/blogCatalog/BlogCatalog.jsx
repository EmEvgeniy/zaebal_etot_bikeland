import { useState } from "react";
import { useGetBlogQuery } from "../../../store/middleWares/blogApi";
import Container from "../../../components/container/Container";
import BlogCard from "../../../components/UI/blogCard/BlogCard";
import { useQuery } from "react-query";
import axios from "axios";

const BlogCatalog = () => {
	const [active, setActive] = useState(false);
	const [data, setData] = useState([]);
	const { isSuccess } = useQuery({
		queryKey: ["blog"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.bikeland.uz/v1/blogs?page=1&size=50`
			);
			setData(data.items);
		},
	});
	console.log(data);
	return (
		<div style={{ width: "100%" }}>
			{isSuccess && data?.length !== 0 && (
				<Container>
					{isSuccess && data.length !== 0 && (
						<div className='inner'>
							{active
								? data?.map((el, index) => (
										<BlogCard data={el} key={index} index={index} />
								  ))
								: data
										?.slice(0, 4)
										.map((el, index) => (
											<BlogCard data={el} key={index} index={index} />
										))}
						</div>
					)}
					<div className='main_btn_wrap'>
						{data?.length && (
							<span
								className={active ? `main_btn active` : `main_btn`}
								onClick={() => setActive(true)}>
								Загрузить ещё
							</span>
						)}
					</div>
				</Container>
			)}
		</div>
	);
};

export default BlogCatalog;
