import { useState } from "react";
import channelsList from "../channelsList";
import { countries } from "../../data/countries";
import "./filtersBar.css";

interface FiltersBarProps {
	setSelectedCountry: Function;
	setSearchTerm: Function;
	selectedCountry: string;
}

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
	console.log("filter bar render");

	return (
		<div className="filters-container">
			<p>Filters:</p>
			<div className="search-bar-container">
				<form
					className="filter-option search-bar"
					onSubmit={(e) => {
						e.preventDefault();
						setSearchTerm(term);
					}}
				>
					<input
						type="text"
						id="search-term"
						name="term"
						value={term}
						placeholder="Search for channels, e.g. Google"
						onChange={(e) => setTerm(e.target.value)}
					/>
					<button type="submit"> Search</button>
				</form>
			</div>

			{/* COUNTRY SEARCH BAR FILTER */}
			<select
				className="filter-option"
				name="country options"
				value={selectedCountry}
				onChange={(e) => setSelectedCountry(e.target.value)}
			>
				<option value="all">ALL</option>
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
