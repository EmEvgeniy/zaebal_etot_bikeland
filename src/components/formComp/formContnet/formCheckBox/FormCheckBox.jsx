import React, { useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const FormCheckBox = ({ fn, active, value }) => {
	const [selectedValues, setSelectedValues] = React.useState([]);

	useEffect(() => {
		// При изменении props.value, устанавливаем выбранные значения в соответствии с новым значением
		if (value === "") {
			setSelectedValues([]);
		} else if (value) {
			// Если props.value не пусто, разбиваем его на массив выбранных значений
			setSelectedValues(value.split(", "));
		}
	}, [value]);

	const handleChange = (event) => {
		const selectedValue = event.target.value;
		const isChecked = event.target.checked;

		let updatedValues = [...selectedValues];

		if (isChecked) {
			updatedValues.push(selectedValue);
		} else {
			updatedValues = updatedValues.filter((value) => value !== selectedValue);
		}

		setSelectedValues(updatedValues);
		fn(updatedValues.join(", "));
	};

	return (
		<FormGroup
			sx={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				alignItems: "center",
				justifyItems: "flex-start",
				width: "100%",
				margin: "0px 0 50px 0",
				color: active ? "red" : "#000",
			}}>
			<FormControlLabel
				control={
					<Checkbox
						value={"Посоветовали друзья"}
						checked={selectedValues.includes("Посоветовали друзья")}
						onChange={handleChange}
					/>
				}
				label={"Посоветовали друзья"}
			/>

			<FormControlLabel
				control={
					<Checkbox
						value={"Посетил шоурум"}
						checked={selectedValues.includes("Посетил шоурум")}
						onChange={handleChange}
					/>
				}
				label='Посетил шоурум'
			/>

			<FormControlLabel
				control={
					<Checkbox
						value={"YouTube"}
						checked={selectedValues.includes("YouTube")}
						onChange={handleChange}
					/>
				}
				label='YouTube'
			/>

			<FormControlLabel
				control={
					<Checkbox
						value={"Telegram"}
						checked={selectedValues.includes("Telegram")}
						onChange={handleChange}
					/>
				}
				label='Telegram'
			/>

			<FormControlLabel
				control={
					<Checkbox
						value={"Instagram"}
						checked={selectedValues.includes("Instagram")}
						onChange={handleChange}
					/>
				}
				label='Instagram'
			/>

			<FormControlLabel
				control={
					<Checkbox
						value={"Facebook"}
						checked={selectedValues.includes("Facebook")}
						onChange={handleChange}
					/>
				}
				label='Facebook'
			/>
		</FormGroup>
	);
};

export default FormCheckBox;
