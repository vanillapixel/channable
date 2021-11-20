import { useCallback, useState } from "react";
import channelsList from "../channelsList";
import { countries } from "../../data/countries";
import "./filtersBar.css";

interface FiltersBarProps {
	setSelectedCountry: Function;
	setSearchTerm: Function;
	selectedCountry: string;
}

// TODO: optimisation and cleanup - the filters need to be split in 2 different components and applied at the same time - currently split and not combined

export const FiltersBar = ({
	selectedCountry,
	setSelectedCountry,
	setSearchTerm,
}: FiltersBarProps) => {
	// unique country names sorted alphabetically
	let countriesList = [
		...new Set([...channelsList].map((country, id) => country.country)),
	].sort((a, b) => {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	});
	type Countries = {
		[key: string]: string;
	};
	const countriesFullNames: Countries = countries;

	let [term, setTerm] = useState("");

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			setSearchTerm(term);
		},
		[setSearchTerm, term]
	);

	//TODO: RENAME FUNCTIONS

	const updateCountry = useCallback(
		(e) => setSelectedCountry(e.target.value),
		[setSelectedCountry]
	);

	const updateTerm = useCallback((e) => setTerm(e.target.value), []);

	console.log("filter bar render");

	return (
		//TODO: export setTerm

		<div className="filters-container">
			<p>Filters:</p>
			<div className="search-bar-container">
				<form className="filter-option search-bar" onSubmit={onSubmit}>
					<input
						type="text"
						id="search-term"
						name="term"
						value={term}
						placeholder="Search for channels, e.g. Google"
						onChange={updateTerm}
					/>
					<button type="submit"> Search</button>
				</form>
			</div>

			{/* COUNTRY SEARCH BAR FILTER */}
			<select
				className="filter-option"
				name="country options"
				value={selectedCountry}
				onChange={updateCountry}
			>
				<option value="all">---------</option>
				{countriesList.map((country: string, id) => (
					<>
						<option key={id} value={country}>
							{countriesFullNames[country.toLowerCase()]}
						</option>
					</>
				))}
			</select>
		</div>
	);
};
