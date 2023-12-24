import classes from "./forEmployees.module.css";
import { motion } from "framer-motion";
import FormComp2 from "./formComp2/FormComp2";

const ForEmployees = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ delay: 0.7, duration: 1 }}
			className={classes.ForEmployeesPage}>
			<h1 className={classes.title}>РАБОТА В КОМАНДЕ BIKELAND.UZ</h1>
			<FormComp2 />
		</motion.div>
	);
};

export default ForEmployees;
