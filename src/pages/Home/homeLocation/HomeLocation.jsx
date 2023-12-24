import Container from "../../../components/container/Container";
import classes from "./homeLocation.module.css";
import CityInfo from './cardInfo/CardInfo'

export default function HomeLocation({ block }) {
	return (
		<section className={classes.HomeLocation}>
			<Container>
				{block && <h3>НАШИ ШОУРУМЫ</h3>}
				<CityInfo />
			</Container>
		</section>
	);
}
