import classes from "./forminput.module.css";

const Forminput = ({ title, fn, placeholder, active, value }) => {
	return (
		<div className={classes.FormInput}>
			<span>{title}</span>
			<input
				type='text'
				placeholder={placeholder}
				className={
					active ? `${classes.input} ${classes.fail}` : `${classes.input}`
				}
				value={value}
				onChange={(e) => fn(e.target.value)}
			/>
		</div>
	);
};

export default Forminput;
