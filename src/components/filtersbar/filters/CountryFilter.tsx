import { useEffect, useMemo, useState, useCallback } from "react";

import { channelsData } from "../../../data/channelsData";
import { countries } from "../../../data/countries";

type Countries = {
	[key: string]: string;
};

interface CountryFilterProps {
	filters: {
		selectedCountry: string;
		searchTerm: string;
	};
	setFilters: Function;
}
const countriesFullNames: Countries = countries;

export const CountryFilter = ({ filters, setFilters }: CountryFilterProps) => {
	// unique country names (filters out duplicates with new Set) sorted alphabetically
	let countriesList = useMemo(() => {
		return [
			...new Set([...channelsData].map((channel) => channel.country)),
		].sort((a, b) => {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});
	}, []);

	const [selectedCountry, setSelectedCountry] = useState(
		filters.selectedCountry
	);

	const updateSelectedCountryInputValue = useCallback((e) => {
		e.preventDefault();
		setSelectedCountry(e.target.value);
	}, []);

	useEffect(() => {
		setFilters({ searchTerm: "", selectedCountry });
	}, [selectedCountry, setFilters]);

	return (
		<select
			className="filter-option"
			name="country options"
			value={selectedCountry}
			onChange={updateSelectedCountryInputValue}
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
	);
};
