import Container from "../../../components/container/Container";
import classes from "./homeVideoComp.module.css";
import HomeVideoCompContent from "./HomeVideoCompContent/HomeVideoCompContent";

export default function HomeVideoComp() {
	return (
		<section className={classes.MainVideoComp}>
			<Container>
				<HomeVideoCompContent />
			</Container>
		</section>
	);
}
