import { useMemo, ChangeEventHandler } from "react";

import { channelsData } from "../../../data/channelsData";
import { countries } from "../../../data/countries";

type Countries = {
	[key: string]: string;
};

interface CountryFilterProps {
	selectedCountry: string;
	updateSelectedCountryFilter: ChangeEventHandler<HTMLSelectElement>;
}
const countriesFullNames: Countries = countries;

export const CountryFilter = ({
	selectedCountry,
	updateSelectedCountryFilter,
}: CountryFilterProps) => {
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

	return (
		<select
			className="filter-option"
			name="country options"
			value={selectedCountry}
			onChange={updateSelectedCountryFilter}
		>
			<option value="all">All countries</option>
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
